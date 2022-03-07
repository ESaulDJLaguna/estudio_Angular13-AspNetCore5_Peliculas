using Backend.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
	public class Genero
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "El campo {0} es requerido")]
		[StringLength(maximumLength: 50, ErrorMessage = "La longitud máxima es de 10")]
		[PrimeraLetraMayuscula]
		public string NombreGenero { get; set; }
		public List<PeliculasGeneros> PeliculasGeneros { get; set; }
	}
}
