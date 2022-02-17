using Backend.Filtros;
using Backend.Models;
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

				//* CONTROLADORES
				public GenerosController(ILogger<GenerosController> logger, ApplicationDbContext context)
				{
						this.logger = logger;
						this.context = context;
				}
				
				[HttpGet] // api/generos
				public async Task<ActionResult<List<Genero>>> Get()
				{
						return await context.Generos.ToListAsync();
				}
				
				[HttpGet("{Id:int}")] // api/generos/1
				public ActionResult<Genero> Get(int Id)
				{
						throw new NotImplementedException();
				}
				
				[HttpPost]
				public async Task<ActionResult> Post([FromBody] Genero genero)
				{
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
