using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
	public class ActorCreacionDTO
	{
		[Required]
		[StringLength(maximumLength: 200)]
		public string Nombre { get; set; }
		public string Biografia { get; set; }
		public DateTime FechaNacimiento { get; set; }
		// En el caso de la creación, la foto NO será un string
		// sino que será la foto como tal
		public IFormFile Foto { get; set; }
	}
}
