using Backend.Filtros;
using Backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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

				//* CONTROLADORES
				public GenerosController(ILogger<GenerosController> logger)
				{
						this.logger = logger;
				}
				
				[HttpGet] // api/generos
				public ActionResult<List<Genero>> Get()
				{
						return new List<Genero>() { new Genero() { Id = 1, NombreGenero = "Comedia" } };
				}
				
				[HttpGet("{Id:int}")] // api/generos/1
				public async Task<ActionResult<Genero>> Get(int Id)
				{
						throw new NotImplementedException();
				}
				
				[HttpPost]
				public ActionResult Post([FromBody] Genero genero)
				{
						throw new NotImplementedException();
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
