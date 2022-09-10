using AutoMapper;
using Backend.DTOs;
using Backend.Filtros;
using Backend.Models;
using Backend.Utilidades;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
	[Route("api/generos")]
	[ApiController]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "EsAdmin")]
	public class GenerosController : ControllerBase
	{
		private readonly ILogger<GenerosController> logger;
		private readonly ApplicationDbContext dbContext;
		private readonly IMapper mapper;

		//! CONSTRUCTORES
		public GenerosController(ILogger<GenerosController> logger, ApplicationDbContext dbContext, IMapper mapper)
		{
			this.logger = logger;
			this.dbContext = dbContext;
			this.mapper = mapper;
		}

		[HttpGet] // api/generos
		public async Task<ActionResult<List<GeneroDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
		{
			// Un IQueryable es un objeto que me permite hacer una consulta a la base de datos.
			var queryable = dbContext.Generos.AsQueryable();
			// Agregamos datos en la cabecera de la petición que se enviará como respuesta
			await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
			var generos = await queryable.OrderBy(x => x.NombreGenero).Paginar(paginacionDTO).ToListAsync();
			// Toma el listado de géneros y mapealo al tipo List<GeneroDTO>
			return mapper.Map<List<GeneroDTO>>(generos);
		}

		[HttpGet("todos")]
		[AllowAnonymous]
		public async Task<ActionResult<List<GeneroDTO>>> Todos()
		{
			var generos = await dbContext.Generos.ToListAsync();
			return mapper.Map<List<GeneroDTO>>(generos);
		}

		[HttpGet("{Id:int}")] // api/generos/1
		public async Task<ActionResult<GeneroDTO>> Get(int Id)
		{
			var genero = await dbContext.Generos.FirstOrDefaultAsync(x => x.Id == Id);

			if (genero == null)
			{
				return NotFound();
			}

			return mapper.Map<GeneroDTO>(genero);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] GeneroCreacionDTO generoCreacionDTO)
		{
			var genero = mapper.Map<Genero>(generoCreacionDTO);
			dbContext.Add(genero);
			await dbContext.SaveChangesAsync();
			return NoContent();
		}

		[HttpPut("{id:int}")]
		public async Task<ActionResult> Put(int Id, [FromBody] GeneroCreacionDTO generoCreacionDTO)
		{
			var genero = await dbContext.Generos.FirstOrDefaultAsync(x => x.Id == Id);

			if (genero == null)
			{
				return NotFound();
			}
			// Mapeamos de GeneroCreacionDTO a Genero y guardamos el resultado en genero
			genero = mapper.Map(generoCreacionDTO, genero);

			await dbContext.SaveChangesAsync();
			return NoContent();
		}

		[HttpDelete("{Id:int}")]
		public async Task<ActionResult> Delete(int Id)
		{
			var existe = await dbContext.Generos.AnyAsync(x => x.Id == Id);

			if (!existe)
			{
				return NotFound();
			}

			dbContext.Remove(new Genero() { Id = Id });
			await dbContext.SaveChangesAsync();
			return NoContent();
		}
	}
}
