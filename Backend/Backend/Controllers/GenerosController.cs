using Backend.Models;
using Backend.Repository.IRepository;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/generos")]
    // Heredamos métodos auxiliares para retornar de forma sencilla un 404, entre otros
    public class GenerosController : ControllerBase
    {
        private readonly IRepositorio repositorio;

        public GenerosController(IRepositorio repositorio)
        {
            this.repositorio = repositorio;
        }
        // Este método se corresponde a dos endpoints
        [HttpGet] // api/generos
        [HttpGet("listado")] // api/generos/listado
        [HttpGet("/listadogeneros")] // /listadogeneros
        public ActionResult<List<Genero>> Get()
        {
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
        [HttpGet("{Id:int}/{nombre=Roberto}")] // api/generos/1 o api/generos/1/Felipe
        //public Genero Get(int Id, string nombre) // Recibe dos parámetros
        // Como ObtenerPorId es asíncrono, este método lo convertimos en asíncrono. Por lo que debe devolver un Task<T>
        public async Task<ActionResult<Genero>> Get(int Id, string nombre) // Recibe dos parámetros
        //public IActionResult Get(int Id, string nombre) // Recibe dos parámetros
        {
            // ObtenerPorId retorna un Task<Genero>, usamos await para "sacar" el Genero
            var genero = await repositorio.ObtenerPorId(Id);

            // Si no se encontró el género buscado...
            if (genero == null)
            {
                // ...retorna un 404
                return NotFound();
            }
            return genero; // Se usa cuando el método retorna un Genero o un ActionResult<Genero>
            //return Ok(genero);
        }

        [HttpPost]
        public ActionResult Post()
        {
            return NoContent();
        }

        [HttpPut]
        public ActionResult Put()
        {
            return NoContent();
        }

        [HttpDelete]
        public ActionResult Delete()
        {
            return NoContent();
        }
    }
}
