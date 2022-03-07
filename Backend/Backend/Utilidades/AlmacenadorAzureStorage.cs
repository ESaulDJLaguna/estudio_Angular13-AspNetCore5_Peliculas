using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
		public class AlmacenadorAzureStorage : IAlmacenadorArchivos
		{
				private string connectionString;
				public AlmacenadorAzureStorage(IConfiguration configuration)
				{
						connectionString = configuration.GetConnectionString("AzureStorage");
				}

				public async Task<string> GuardarArchivo(string contenedor, IFormFile archivo)
				{
						var cliente = new BlobContainerClient(connectionString, contenedor);
						// Crea el contenedor en caso de que no exista
						await cliente.CreateIfNotExistsAsync();
						// El contenedor será púlico a nivel de blobl
						cliente.SetAccessPolicy(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
						// Obtenemos la extensión del archivo que el usuario ha subido
						var extension = Path.GetExtension(archivo.FileName);
						// Nombramos el archivo. Utilizaremos un Guid porque queremos que su nombre sea único
						var archivoNombre = $"{Guid.NewGuid()}{extension}";
						var blob = cliente.GetBlobClient(archivoNombre);
						// Subimos el archivo
						await blob.UploadAsync(archivo.OpenReadStream());
						// Retornamos la url del archivo que hemos subido
						return blob.Uri.ToString();
				}

				public async Task BorrarArchivo(string ruta, string contenedor)
				{
						// Si se pasó una ruta vacía
						if (string.IsNullOrEmpty(ruta))
						{
								return;
						}

						var cliente = new BlobContainerClient(connectionString, contenedor);
						await cliente.CreateIfNotExistsAsync();
						// Obtenemos el nombre del archivo. Le pasamos dónde está gaurdado
						var archivo = Path.GetFileName(ruta);
						var blob = cliente.GetBlobClient(archivo);
						// Lo eliminamos si existe
						await blob.DeleteIfExistsAsync();
				}

				public async Task<string> EditarArchivo(string contenedor, IFormFile archivo, string ruta)
				{
						await BorrarArchivo(ruta, contenedor);
						return await GuardarArchivo(contenedor, archivo);
				}
		}
}
