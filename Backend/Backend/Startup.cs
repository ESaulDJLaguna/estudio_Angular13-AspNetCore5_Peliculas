using Backend.Controllers;
using Backend.Filtros;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Backend
{
		public class Startup
		{
				public Startup(IConfiguration configuration)
				{
						Configuration = configuration;
				}

				public IConfiguration Configuration { get; }

				// This method gets called by the runtime. Use this method to add services to the container.
				public void ConfigureServices(IServiceCollection services)
				{
						// Configuramos el servicio AutoMapper
						services.AddAutoMapper(typeof(Startup));

						// Agregamos la cadena de conexión
						services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("defaultConnection")));

						// Habilitamos los CORS
						services.AddCors(options =>
						{
								// Obtenemos el nombre del dominio que configuramos en appsettings
								var frontendURL = Configuration.GetValue<string>("frontend_url");
								options.AddDefaultPolicy(builder =>
								{
										builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader()
										// Definimos un arreglo de cadenas con los nombres de las cabeceras que queremos exponer en el frontend
										.WithExposedHeaders(new string[] { "cantidadTotalRegistros" });
								});
						});

						// Configuramos esquema de autenticación
						services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

						services.AddControllers(options =>
						{
								options.Filters.Add(typeof(FiltroDeExcepcion));
						});
						services.AddSwaggerGen(c =>
						{
								c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
						});
				}

				// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
				public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
				{
						if (env.IsDevelopment())
						{
								app.UseDeveloperExceptionPage();
								app.UseSwagger();
								app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend v1"));
						}

						app.UseHttpsRedirection();

						app.UseRouting();

						app.UseCors();

						app.UseAuthentication();

						app.UseAuthorization();

						app.UseEndpoints(endpoints =>
						{
								endpoints.MapControllers();
						});
				}
		}
}
