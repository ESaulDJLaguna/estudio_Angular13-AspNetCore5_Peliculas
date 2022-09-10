using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
	public static class HttpContextExtensions
	{
		public async static Task InsertarParametrosPaginacionEnCabecera<T>(this HttpContext httpContext, IQueryable<T> queryable)
		{
			if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

			// Cuenta cuántos registros hay en la tabla de la BD (trabaja con consulta no en memoria)
			double cantidad = await queryable.CountAsync();
			// Se enviará la cantidad total de registros en una tabla de la BD como respuesta en la cabecera de la petición
			httpContext.Response.Headers.Add("cantidadTotalRegistros", cantidad.ToString());
		}
	}
}
