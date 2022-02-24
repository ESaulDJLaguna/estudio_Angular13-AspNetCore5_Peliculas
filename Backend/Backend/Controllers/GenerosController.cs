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
		public class GenerosController : ControllerBase
		{
				private readonly ILogger<GenerosController> logger;
				private readonly ApplicationDbContext context;
				private readonly IMapper mapper;

				//* CONTROLADORES
				public GenerosController(ILogger<GenerosController> logger, ApplicationDbContext context, IMapper mapper)
				{
						this.logger = logger;
						this.context = context;
						this.mapper = mapper;
				}
				
				[HttpGet] // api/generos
				public async Task<ActionResult<List<GeneroDTO>>> Get([FromQuery] PaginacionDTO paginacionDTO)
				{
						var queryable = context.Generos.AsQueryable();
						await HttpContext.InsertarParametrosPaginacionEnCabecera(queryable);
						var generos = await queryable.OrderBy(x => x.NombreGenero).Paginar(paginacionDTO).ToListAsync();
						// Toma el listado de géneros y mapealo al tipo List<GeneroDTO>
						return mapper.Map<List<GeneroDTO>>(generos);
				}
				
				[HttpGet("{Id:int}")] // api/generos/1
				public ActionResult<Genero> Get(int Id)
				{
						throw new NotImplementedException();
				}
				
				[HttpPost]
				public async Task<ActionResult> Post([FromBody] GeneroCreacionDTO generoCreacionDTO)
				{
						var genero = mapper.Map<Genero>(generoCreacionDTO);
						context.Add(genero);
						await context.SaveChangesAsync();
						return NoContent();
				}

				[HttpPut]
				public ActionResult Put([FromBody] Genero genero)
				{
						throw new NotImplementedException();
				}

				[HttpDelete]
				public ActionResult Delete()
				{
						throw new NotImplementedException();
				}
		}
}
