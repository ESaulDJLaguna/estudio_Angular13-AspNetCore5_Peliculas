using Backend.Filtros;
using Backend.Models;
using Backend.Repository.IRepository;
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
		// De manera automática, realiza validaciones del estado de los campos
		[ApiController]
		// Protegemos con autorización nuestro controlador
		//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
		// Heredamos métodos auxiliares para retornar de forma sencilla un 404, entre otros
		public class GenerosController : ControllerBase
		{
				private readonly IRepositorio repositorio;
				private readonly WeatherForecastController weatherForecastController;
				private readonly ILogger<GenerosController> logger;

				public GenerosController(IRepositorio repositorio, WeatherForecastController weatherForecastController, ILogger<GenerosController> logger)
				{
						this.repositorio = repositorio;
						this.weatherForecastController = weatherForecastController;
						this.logger = logger;
				}
				// Este método se corresponde a dos endpoints
				[HttpGet] // api/generos
				[HttpGet("listado")] // api/generos/listado
				[HttpGet("/listadogeneros")] // /listadogeneros
				//[ResponseCache(Duration = 60)]
				//[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
				[ServiceFilter(typeof(MiFiltroDeAccion))]
				public ActionResult<List<Genero>> Get()
				{
						logger.LogInformation("Vamos a mostrar los géneros");
						return repositorio.ObtenerTodosLosGeneros();
				}
				// Si lo dejamos así, causará una excepción de ambigüedad con el Get() anterior
				//[HttpGet]  // ERROR DE AMBIGÜEDAD
				// Si utilizamos una plantilla se tendrá que pasar un query parameter para acceder a un género
				//[HttpGet("ejemplo")] // Nuevo endpoint: api/generos/ejemplo?id=2
				// Utilizamos una variable de ruta
				//[HttpGet("{Id}")] // Endpoint con variable de ruta: api/generos/2
				// Se puede pasar más de un parámetro
				//[HttpGet("{Id}/{nombre}")] // api/generos/3/felipe
				// La petición solo retornará un tipo de dato Genero, pero si es nulo al buscar, no podemos retornar un 404
				//public Genero Get(int Id)
				// El parámetro nombre es opcional
				//[HttpGet("{Id}/{nombre=Roberto}")] // api/generos/1 o api/generos/1/Felipe
				// Restricción de la variable de ruta. Si id recibe algo distinto de un entero, lanza un 404
				//[HttpGet("{Id:int}/{nombre=Roberto}")] // api/generos/1 o api/generos/1/Felipe
				//public Genero Get(int Id, string nombre) // Recibe dos parámetros
				// Como ObtenerPorId es asíncrono, este método lo convertimos en asíncrono. Por lo que debe devolver un Task<T>
				//public async Task<ActionResult<Genero>> Get(int Id, string nombre) // Recibe dos parámetros
				[HttpGet("{Id:int}")] // nombre ya no se pasará como una variable de ruta sino como un query string
				//public async Task<ActionResult<Genero>> Get(int Id, [BindRequired] string nombre) // nombre es obligatorio
				// nombre NO es obligatorio y se envía desde la cabecera de la petición
				public async Task<ActionResult<Genero>> Get(int Id, [FromHeader] string nombre) // nombre es obligatorio
				//public IActionResult Get(int Id, string nombre) // Recibe dos parámetros
				{
						logger.LogDebug($"Obteniendo un género por el id {Id}");
						// Si ModelState.IsValid es verdadero, es porque es válido y si es falso, es porque NO es válido
						if (!ModelState.IsValid)
						{
								// Le enviará al usuario un error 400 y le va a indicar qué reglas de validación no ha cumplido
								return BadRequest(ModelState);
						}

						// ObtenerPorId retorna un Task<Genero>, usamos await para "sacar" el Genero
						var genero = await repositorio.ObtenerPorId(Id);

						// Si no se encontró el género buscado...
						if (genero == null)
						{
								logger.LogWarning($"No pudimos encontrar el género de id {Id}");
								// ...retorna un 404
								return NotFound();
						}
						return genero; // Se usa cuando el método retorna un Genero o un ActionResult<Genero>
													 //return Ok(genero);
				}

				[HttpGet("guid")]
				public ActionResult<Guid> GetGUID()
				{
						// Muestra un guid diferente cada vez que realizamos la petición
						//return repositorio.ObtenerGuid();
						return Ok(new
						{
								GUID_GenerosController = repositorio.ObtenerGuid(),
								GUID_WeatherForecastController = weatherForecastController.ObtenerGUIDWeatherForeCastController()
						});
				}

				[HttpPost]
				public ActionResult Post([FromBody] Genero genero)
				{
						if (!ModelState.IsValid)
						{
								// Le enviará al usuario un error 400 y le va a indicar qué reglas de validación no ha cumplido
								return BadRequest(ModelState);
						}
						repositorio.CrearGenero(genero);
						return NoContent();
				}

				[HttpPut]
				public ActionResult Put([FromBody] Genero genero)
				{
						if (!ModelState.IsValid)
						{
								// Le enviará al usuario un error 400 y le va a indicar qué reglas de validación no ha cumplido
								return BadRequest(ModelState);
						}
						return NoContent();
				}

				[HttpDelete]
				public ActionResult Delete()
				{
						return NoContent();
				}
		}
}
