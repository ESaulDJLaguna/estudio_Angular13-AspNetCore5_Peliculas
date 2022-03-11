using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using Backend.Utilidades;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
  [Route("api/actores")]
  [ApiController]
  public class ActoresController : ControllerBase
  {
	private readonly ApplicationDbContext context;
	private readonly IMapper mapper;
	private readonly IAlmacenadorArchivos almacenadorArchivos;
	private readonly string contenedor = "actores";

	public ActoresController(ApplicationDbContext context, IMapper mapper, IAlmacenadorArchivos almacenadorArchivos)
	{
	  this.context = context;
	  this.mapper = mapper;
	  this.almacenadorArchivos = almacenadorArchivos;
	}

	[HttpGet]
	public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
	{
	  var queryable = context.Actores.AsQueryable();
	  await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
	  var actores = await queryable.OrderBy(x => x.Nombre).Paginar(paginacionDTO).ToListAsync();
	  // Toma el listado de géneros y mapealo al tipo List<GeneroDTO>
	  return mapper.Map<List<ActorDTO>>(actores);
	}

	[HttpGet("{Id:int}")]
	public async Task<ActionResult<ActorDTO>> Get(int Id)
	{
	  var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == Id);

	  if (actor == null)
	  {
		return NotFound();
	  }

	  return mapper.Map<ActorDTO>(actor);
	}

	[HttpPost]
	public async Task<ActionResult> Post([FromForm] ActorCreacionDTO actorCreacionDTO)
	{
	  var actor = mapper.Map<Actor>(actorCreacionDTO);
	  // Si se pasó una foto, la almacena en Azure Storage
	  if (actorCreacionDTO.Foto != null)
	  {
		// Retorna un string que representa la ruta donde se guardó el archivo
		actor.Foto = await almacenadorArchivos.GuardarArchivo(contenedor, actorCreacionDTO.Foto);
	  }

	  context.Add(actor);
	  await context.SaveChangesAsync();
	  return NoContent();
	}

	[HttpPost("buscarPorNombre")]
	public async Task<ActionResult<List<PeliculaActorDTO>>> BuscarPorNombre([FromBody] string nombre)
	{
	  if (string.IsNullOrWhiteSpace(nombre)) { return new List<PeliculaActorDTO>(); }

	  return await context.Actores
		  .Where(x => x.Nombre.Contains(nombre))
		  .Select(x => new PeliculaActorDTO { Id = x.Id, Nombre = x.Nombre, Foto = x.Foto })
		  // Solo buscará 5, porque no quiero que si el usuario escribe 'a', traiga todos los actores
		  // que contienen una 'a'
		  .Take(5)
		  .ToListAsync();
	}

	[HttpPut("{Id:int}")]
	public async Task<ActionResult> Put(int Id, [FromForm] ActorCreacionDTO actorCreacionDTO)
	{
	  var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == Id);

	  if (actor == null)
	  {
		return NotFound();
	  }

	  actor = mapper.Map(actorCreacionDTO, actor);

	  if (actorCreacionDTO.Foto != null)
	  {
		actor.Foto = await almacenadorArchivos.EditarArchivo(contenedor, actorCreacionDTO.Foto, actor.Foto);
	  }

	  await context.SaveChangesAsync();
	  return NoContent();
	}


	[HttpDelete("{Id:int}")]
	public async Task<ActionResult> Delete(int Id)
	{
	  var actor = await context.Actores.FirstOrDefaultAsync(x => x.Id == Id);

	  if (actor == null)
	  {
		return NotFound();
	  }

	  context.Remove(actor);
	  await context.SaveChangesAsync();

	  await almacenadorArchivos.BorrarArchivo(actor.Foto, contenedor);

	  return NoContent();
	}
  }
}
