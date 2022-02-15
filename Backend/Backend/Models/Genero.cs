using Backend.Validaciones;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Genero: IValidatableObject
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(maximumLength: 10, ErrorMessage = "La longitud máxima es de 10")]
        //[PrimeraLetraMayuscula]
        public string NombreGenero { get; set; }
        [Range(18, 120, ErrorMessage = "La edad debe estar entre 18 y 120")]
				public int Edad { get; set; }
        [CreditCard(ErrorMessage = "Tarjeta de crédito NO válida")]
				public string TarjetaDeCredito { get; set; }
        [Url(ErrorMessage = "No es una URL válida")]
				public string Url { get; set; }

				public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
				{
						if(!string.IsNullOrEmpty(NombreGenero))
						{
								var primeraLetra = NombreGenero[0].ToString();

								if (primeraLetra != primeraLetra.ToUpper())
								{
										// Insertamos al IEnumerable de retorno de una manera muy fácil
										yield return new ValidationResult("La primera letra debe ser mayúscula", new string[] { nameof(NombreGenero) });
								}
						}
				}
		}
}
