using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
	// Representa lo que necesitaremos en nuestro formulario. Obtendremos el listado
	// de géneros y cines en el componenten de crear películas.
	public class PeliculasPostGetDTO
	{
		public List<GeneroDTO> Generos { get; set; }
		public List<CineDTO> Cines { get; set; }
	}
}
