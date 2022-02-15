using Backend.Controllers;
using Backend.Filtros;
using Backend.Repository;
using Backend.Repository.IRepository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
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
            // Configuramos esquema de autenticación
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();
            // Activamos el caché en nuestra aplicación
            services.AddResponseCaching();
            services.AddSingleton<IRepositorio, RepositorioEnMemoria>();
            services.AddScoped<WeatherForecastController>();
            services.AddTransient<MiFiltroDeAccion>();
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            app.Use(async (context, next) =>
            {
                using (var swapStream = new MemoryStream())
                {
                    var respuestaOriginal = context.Response.Body;
                    context.Response.Body = swapStream;

                    // Continúa la ejecución del pipeline (invoca al siguiente middleware)
                    await next.Invoke();

                    // Iniciamos desde el inicio
                    swapStream.Seek(0, SeekOrigin.Begin);
                    // Leemos la respuesta hasta el final
                    string respuesta = new StreamReader(swapStream).ReadToEnd();
                    // Volvemos a colocar al incio
                    swapStream.Seek(0, SeekOrigin.Begin);

                    // Copiamos el stream en memoria al original
                    await swapStream.CopyToAsync(respuestaOriginal);
                    // Tendremos el stream (respuestaOriginal) en context.Response.Body, el cual
                    // puede ser leído por el framework para que así la respuesta Http pueda ser
                    // enviada hacia el cliente de la aplicación.
                    context.Response.Body = respuestaOriginal;

                    // Ahora guardaremos en un log la 'respuesta' (variable de arriba)
                    // que es el cuerpo de la petición Http en stream. Para eso inyectamos el servicio
                    // ILogger en el método Configure
                    logger.LogInformation(respuesta);
                }
            });

            app.Map("/mapa1", (app) =>
            {
                app.Run(async context =>
                {
                    await context.Response.WriteAsync("Estoy interceptando el pipeline");
                });
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseResponseCaching();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
