using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using Backend.Utilidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
  [Route("api/peliculas")]
  [ApiController]
  public class PeliculasController : ControllerBase
  {
	private readonly ApplicationDbContext context;
	private readonly IMapper mapper;
	private readonly IAlmacenadorArchivos almacenadorArchivos;
	private readonly string contenedor = "peliculas";

	public PeliculasController(ApplicationDbContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
	{
	  this.context = context;
	  this.mapper = mapper;
	  this.almacenadorArchivos = almacenadorArchivos;
	}

	[HttpGet]
	public async Task<ActionResult<LandingPageDTO>> Get()
	{
	  var top = 6;
	  var fechaActual = DateTime.Now;

	  var proximosEstrenos = await context.Peliculas
		.Where(x => x.FechaLanzamiento > fechaActual)
		.OrderBy(x => x.FechaLanzamiento)
		// Tomamos solo los primeros 6
		.Take(top)
		.ToListAsync();

	  var enCines = await context.Peliculas
		.Where(x => x.EnCines)
		.OrderBy(x => x.FechaLanzamiento)
		.Take(top)
		.ToListAsync();

	  // Creamos la variable que retornaremos
	  var resultado = new LandingPageDTO();
	  // Mapeamos proximosEstrenos y enCines a DTOs
	  resultado.ProximosEstrenos = mapper.Map<List<PeliculaDTO>>(proximosEstrenos);
	  resultado.EnCines = mapper.Map<List<PeliculaDTO>>(enCines);

	  return resultado;
	}

	[HttpGet("{Id:int}")]
	public async Task<ActionResult<PeliculaDTO>> Get(int Id)
	{
	  //! Lo que haces es decirle que nos incluya los datos que se encuentran en
	  //! PeliculasGeneros y que incluya Generos que está dentro de PeliculasGenero
	  //! y se hace lo mismo con las demás relaciones
	  var pelicula = await context.Peliculas
		  // Se utiliza include para incluir datos relacionados, es decir, para
		  // traer por ejemplo los géneros
		  // Se utiliza ThenInclude para a su vez traer el género de la película
		  .Include(x => x.PeliculasGeneros).ThenInclude(x => x.Genero)
		  .Include(x => x.PeliculasActores).ThenInclude(x => x.Actor)
		  .Include(x => x.PeliculasCines).ThenInclude(x => x.Cine)
		  .FirstOrDefaultAsync(x => x.Id == Id);

	  if (pelicula == null) { return NotFound(); }

	  var dto = mapper.Map<PeliculaDTO>(pelicula);
	  dto.Actores = dto.Actores.OrderBy(x => x.Orden).ToList();
	  return dto;
	}

	[HttpGet("filtrar")]
	// Necesitamos una clase que va a encapsular los datos que el usuario va a enviar a través
	// de la petición HTTP
	public async Task<ActionResult<List<PeliculaDTO>>> Filtrar([FromQuery] PeliculasFiltrarDTO peliculasFiltrarDTO)
	{
	  var peliculasQueryable = context.Peliculas.AsQueryable();

	  if (!string.IsNullOrEmpty(peliculasFiltrarDTO.Titulo))
	  {
		peliculasQueryable = peliculasQueryable.Where(x => x.Titulo.Contains(peliculasFiltrarDTO.Titulo));
	  }

	  if(peliculasFiltrarDTO.EnCines)
	  {
		peliculasQueryable = peliculasQueryable.Where(x => x.EnCines);
	  }

	  if (peliculasFiltrarDTO.ProximosEstrenos)
	  {
		// DateTime.Now muestra la fecha y la hora exacta.
		// DateTime.Today muestra la fecha actual y la hora 12:00:00 am
		var hoy = DateTime.Today;
		peliculasQueryable = peliculasQueryable.Where(x => x.FechaLanzamiento > hoy);
	  }

	  if(peliculasFiltrarDTO.GeneroId != 0)
	  {
		// Navegamos hacia PeliculasGeneros que es la clase que contiene los IDs de
		// los géneros correspondientes, seleccionamos los géneros y estamos trayendo
		// solo los que contienen el GeneroId que estamos llamando
		peliculasQueryable = peliculasQueryable
		  .Where(x => x.PeliculasGeneros.Select(y => y.GeneroId)
		  .Contains(peliculasFiltrarDTO.GeneroId));
	  }

	  await HttpContext.InsertarParametrosPaginacionEnCabecera(peliculasQueryable);

	  var peliculas = await peliculasQueryable.Paginar(peliculasFiltrarDTO.PaginacionDTO).ToListAsync();
	  return mapper.Map<List<PeliculaDTO>>(peliculas);
	}

	[HttpPost]
	public async Task<ActionResult<int>> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
	{
	  var pelicula = mapper.Map<Pelicula>(peliculaCreacionDTO);

	  if (peliculaCreacionDTO.Poster != null)
	  {
		pelicula.Poster = await almacenadorArchivos.GuardarArchivo(contenedor, peliculaCreacionDTO.Poster);
	  }
	  EscribirOrdenActores(pelicula);

	  context.Add(pelicula);
	  await context.SaveChangesAsync();
	  return pelicula.Id;
	}

	[HttpGet("PostGet")]
	public async Task<ActionResult<PeliculasPostGetDTO>> PostGet()
	{
	  var cines = await context.Cines.ToListAsync();
	  var generos = await context.Generos.ToListAsync();

	  var cinesDTO = mapper.Map<List<CineDTO>>(cines);
	  var generosDTO = mapper.Map<List<GeneroDTO>>(generos);

	  return new PeliculasPostGetDTO() { Cines = cinesDTO, Generos = generosDTO };
	}

	[HttpGet("PutGet/{Id:int}")]
	public async Task<ActionResult<PeliculasPutGetDTO>> PutGet(int Id)
	{
	  var peliculaActionResult = await Get(Id);

	  if(peliculaActionResult.Result is NotFoundResult) { return NotFound(); }

	  var pelicula = peliculaActionResult.Value;

	  // Busca todos los géneros seleccionados
	  var generosSeleccionadosIds = pelicula.Generos.Select(x => x.Id).ToList();
	  // Busca todos los géneros que no tengan los id de la lista anterior
	  var generosNoSeleccionados = await context.Generos
		.Where(x => !generosSeleccionadosIds.Contains(x.Id))
		.ToListAsync();

	  var cinesSeleccionadosIds = pelicula.Cines.Select(x => x.Id).ToList();
	  var cinesNoSeleccionados = await context.Cines
		.Where(x => !cinesSeleccionadosIds.Contains(x.Id))
		.ToListAsync();

	  // Ahora hacemos los mapeos correspondientes
	  var generosNoSeleccionadosDTO = mapper.Map<List<GeneroDTO>>(generosNoSeleccionados);
	  var cinesNoSeleccionadosDTO = mapper.Map<List<CineDTO>>(cinesNoSeleccionados);

	  var respuesta = new PeliculasPutGetDTO();
	  respuesta.Pelicula = pelicula;
	  respuesta.GenerosSeleccionados = pelicula.Generos;
	  respuesta.GenerosNoSeleccionados = generosNoSeleccionadosDTO;
	  respuesta.CinesSeleccionados = pelicula.Cines;
	  respuesta.CinesNoSeleccionados = cinesNoSeleccionadosDTO;
	  respuesta.Actores = pelicula.Actores;

	  return respuesta;
	}

	// Acción para actualizar la información
	[HttpPut("{Id:int}")]
	public async Task<ActionResult> Put(int Id, [FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
	{
	  var pelicula = await context.Peliculas
		// Necesitamos hacer los Includes porque vamos a editar en memoria la película y esa actualización
		// agarre los cambios en las entidades relacionadas para así, realizar las actualizaciones adecuadas
		// en dichas tablas relacionadas, por ejemplo, si borro un género, quiero que se borre dicho género
		// de la relación entre la película y los géneros.
		.Include(x => x.PeliculasActores)
		.Include(x => x.PeliculasGeneros)
		.Include(x => x.PeliculasCines)
		.FirstOrDefaultAsync(x => x.Id == Id);

	  if(pelicula == null)
	  {
		return NotFound();
	  }

	  pelicula = mapper.Map(peliculaCreacionDTO, pelicula);

	  // Si el usuario envío un poster editaremos el poster actual de la película
	  if( peliculaCreacionDTO.Poster != null)
	  {
		pelicula.Poster = await almacenadorArchivos.EditarArchivo(contenedor, peliculaCreacionDTO.Poster, pelicula.Poster);
	  }

	  // Anotaremos el orden de los actores
	  EscribirOrdenActores(pelicula);
	  await context.SaveChangesAsync();

	  return NoContent();
	}

	// Método que nos permitirá escribir el orden de los actores
	private void EscribirOrdenActores(Pelicula pelicula)
	{
	  if (pelicula.PeliculasActores != null)
	  {
		for (int i = 0; i < pelicula.PeliculasActores.Count; i++)
		{
		  pelicula.PeliculasActores[i].Orden = i;
		}
	  }
	}

	[HttpDelete("{Id:int}")]
	public async Task<ActionResult> Delete(int Id)
	{
	  var pelicula = await context.Peliculas.FirstOrDefaultAsync(x => x.Id == Id);

	  if (pelicula == null)
	  {
		return NotFound();
	  }

	  context.Remove(pelicula);
	  await context.SaveChangesAsync();

	  await almacenadorArchivos.BorrarArchivo(pelicula.Poster, contenedor);

	  return NoContent();
	}
  }
}
