using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
		public class AlmacenadorArchivosLocal : IAlmacenadorArchivos
		{
				private readonly IWebHostEnvironment env;
				private readonly IHttpContextAccessor httpContextAccessor;

				public AlmacenadorArchivosLocal(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
				{
						this.env = env;
						this.httpContextAccessor = httpContextAccessor;
				}
				public Task BorrarArchivo(string ruta, string contenedor)
				{
						// Si se pasa una ruta vacía
						if(string.IsNullOrEmpty(ruta))
						{
								return Task.CompletedTask;
						}

						// Obtenemos el nombre del archivo según la ruta
						var nombreArchivo = Path.GetFileName(ruta);
						var directorioArchivo = Path.Combine(env.WebRootPath, contenedor, nombreArchivo);

						// Si el archivo existe, lo eliminamos
						if(File.Exists(directorioArchivo))
						{
								File.Delete(directorioArchivo);
						}

						// Como no se nececita programación asíncrona
						return Task.CompletedTask;
				}

				public async Task<string> EditarArchivo(string contenedor, IFormFile archivo, string ruta)
				{
						await BorrarArchivo(ruta, contenedor);
						return await GuardarArchivo(contenedor, archivo);
				}

				public async Task<string> GuardarArchivo(string contenedor, IFormFile archivo)
				{
						// Obtenemos la extensión del archivo que se subirá (incluido el punto)
						var extension = Path.GetExtension(archivo.FileName);
						// Creamos un nuevo nombre irrepetible con su extensión
						var nombreArchivo = $"{Guid.NewGuid()}{extension}";
						// Indicamos la carpeta donde se guardará. env.WebRootPath recupera
						// la ruta completa de la carpeta wwwroot. Por lo que folder contendrá:
						// C:\\...\\wwwroot\\actores
						string folder = Path.Combine(env.WebRootPath, contenedor);

						// Si no existe el directorio, lo crearemos
						if(!Directory.Exists(folder))
						{
								Directory.CreateDirectory(folder);
						}
						// Contiene la ruta completa del archivo: C:\\...\\actores\\nombre-archivo.extension
						string ruta = Path.Combine(folder, nombreArchivo);

						// Necesitamos la representación en un arreglo de bytes del IFormFile
						// para esto se utiliza un memoryStream
						using(var memoryStream = new MemoryStream())
						{
								// Copiamos el archivo en el memoryStream
								await archivo.CopyToAsync(memoryStream);
								// 'contenido' tendrá el arreglo de bytes que representa nuestro archivo
								var contenido = memoryStream.ToArray();
								// Guardamos el archivo en wwwroot/actores
								await File.WriteAllBytesAsync(ruta, contenido);
						}
						// urlActual contiene la dirección actual de nuestra API. Scheme
						// devuelve el protocolo: https, mientras que Host devuelve el dominio
						// como estamos en local sería: localhost:5001, por tanto urlActual es:
						// https://localhost:5001
						var urlActual = $"{httpContextAccessor.HttpContext.Request.Scheme}://{httpContextAccessor.HttpContext.Request.Host}";
						// Cuando se utiliza Path.Combine, concatena las cadenas de sus parámetros,
						// pero las separa por \\. El método Replace, reemplaza un caracter o subcadena por otra,
						// pero NO modifica la cadena original, por lo que la ruta sin Replace quedaría:
						// https://localhost:5001\\actores\\nombre-archivo.extension
						// Una vez remplazado quedaría:
						// https://localhost:5001/actores/nombre-archivo.extension
						var rutaParaBD = Path.Combine(urlActual, contenedor, nombreArchivo).Replace("\\", "/");

						return rutaParaBD;
				}
		}
}
