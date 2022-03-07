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

		[HttpGet("{Id:int}")]
		public async Task<ActionResult<PeliculaDTO>> Get(int Id)
		{
			//* Lo que haces es decirle que nos incluya los datos que se encuentran en
			//* PeliculasGeneros y que incluya Generos que está dentro de PeliculasGenero
			//* y se hace lo mismo con las demás relaciones
			var pelicula = await context.Peliculas
				// Se utiliza include para incluir datos relacionados, es decir, para
				// traer por ejemplo los géneros
				// Se utiliza ThenInclude para a su vez traer el género de la película
				.Include(x => x.PeliculasGeneros).ThenInclude(x => x.Genero)
				.Include(x => x.PeliculasActores).ThenInclude(x => x.Actor)
				.Include(x => x.PeliculasCines).ThenInclude(x => x.Cine)
				.FirstOrDefaultAsync(x => x.Id == Id);

			if(pelicula == null) { return NotFound(); }

			var dto = mapper.Map<PeliculaDTO>(pelicula);
			dto.Actores = dto.Actores.OrderBy(x => x.Orden).ToList();
			return dto;
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromForm] PeliculaCreacionDTO peliculaCreacionDTO)
		{
			var pelicula = mapper.Map<Pelicula>(peliculaCreacionDTO);

			if(peliculaCreacionDTO.Poster != null)
			{
				pelicula.Poster = await almacenadorArchivos.GuardarArchivo(contenedor, peliculaCreacionDTO.Poster);
			}
			EscribirOrdenActores(pelicula);

			context.Add(pelicula);
			await context.SaveChangesAsync();
			return NoContent();
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

		// Método que nos permitirá escribir el orden de los actores
		private void EscribirOrdenActores(Pelicula pelicula)
		{
			if(pelicula.PeliculasActores != null)
			{
				for(int i = 0; i < pelicula.PeliculasActores.Count; i++)
				{
					pelicula.PeliculasActores[i].Orden = i;
				}
			}
		}
	}
}
