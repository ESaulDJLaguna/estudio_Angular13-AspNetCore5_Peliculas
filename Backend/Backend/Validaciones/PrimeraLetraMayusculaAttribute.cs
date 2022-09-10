using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Validaciones
{
  public class PrimeraLetraMayusculaAttribute : ValidationAttribute
  {
	protected override ValidationResult IsValid(object value, ValidationContext validationContext)
	{
	  // Esta regla de validación no trata de verificar si el valor es requerido, para eso
	  // utilizamos [Required]
	  if (value == null || string.IsNullOrEmpty(value.ToString()))
	  {
		return ValidationResult.Success;
	  }

	  var primeraLetra = value.ToString()[0].ToString();

	  if (primeraLetra != primeraLetra.ToUpper())
	  {
		return new ValidationResult("La primera letra debe ser mayúscula");
	  }

	  return ValidationResult.Success;
	}
  }
}
