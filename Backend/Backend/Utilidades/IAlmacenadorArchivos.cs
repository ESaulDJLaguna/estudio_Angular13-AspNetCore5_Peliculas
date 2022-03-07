using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
		public interface IAlmacenadorArchivos
		{
				Task BorrarArchivo(string ruta, string contenedor);
				Task<string> EditarArchivo(string contenedor, IFormFile archivo, string ruta);
				Task<string> GuardarArchivo(string contenedor, IFormFile archivo);
		}
}