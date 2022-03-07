using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
	public class TypeBinder<T> : IModelBinder
	{
		public Task BindModelAsync(ModelBindingContext bindingContext)
		{
			var nombrePropiedad = bindingContext.ModelName;
			// Obtenemos el valor de la propiedad
			var valor = bindingContext.ValueProvider.GetValue(nombrePropiedad);

			// Si no hay ningún valor
			if(valor == ValueProviderResult.None)
			{
				return Task.CompletedTask;
			}

			try
			{
				// Se utiliza un parámetro genérico porque vamos a utilizar el TypeBinder
				// con distintos tipos de datos.
				var valorDeserializado = JsonConvert.DeserializeObject<T>(valor.FirstValue);
				bindingContext.Result = ModelBindingResult.Success(valorDeserializado);
			}
			// Si llega a suceder un error, por ejemplo, si estoy esperando un listado de números
			// y recibo un listado de strings.
			catch
			{
				bindingContext.ModelState.TryAddModelError(nombrePropiedad, "El valor dado no es del tipo adecuado");
			}

			return Task.CompletedTask;
		}
	}
}
