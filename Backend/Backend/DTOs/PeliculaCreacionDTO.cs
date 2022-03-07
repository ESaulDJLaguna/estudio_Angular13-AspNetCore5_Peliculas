using Backend.Utilidades;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
	public class PeliculaCreacionDTO
	{
		[Required]
		[StringLength(maximumLength: 300)]
		public string Titulo { get; set; }
		public string Resumen { get; set; }
		public string Trailer { get; set; }
		public bool EnCines { get; set; }
		public DateTime FechaLanzamiento { get; set; }
		public IFormFile Poster { get; set; }
		// Necesitamos ayudar al Model binder con el personalizado para
		// poder recibir un listado a través de un FromForm
		[ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
		public List<int> GenerosIds { get; set; } // Recibe un listado de Ids
		[ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
		public List<int> CinesIds { get; set; } // Recibe un listado de Ids
		// En el caso de los actores será un listado de tipo complejo porque
		// un actor es más que un Id, será el personaje y el orden y debemos
		// capturar esta información, por lo menos la del personaje, el orden se
		// puede definir a nivel de la acción
		[ModelBinder(BinderType = typeof(TypeBinder<List<ActorPeliculaCreacionDTO>>))]
		public List<ActorPeliculaCreacionDTO> ActoresIds { get; set; } // Recibe un listado de Ids
	}
}
