using AutoMapper;
using Backend.Controllers;
using Backend.Filtros;
using Backend.Utilidades;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Configuramos el servicio AutoMapper
			services.AddAutoMapper(typeof(Startup));
			services.AddSingleton(provider => new MapperConfiguration(config =>
			{
				var geometryFactory = provider.GetRequiredService<GeometryFactory>();
				config.AddProfile(new AutoMapperProfiles(geometryFactory));
			}).CreateMapper());
			services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));

			services.AddTransient<IAlmacenadorArchivos, AlmacenadorArchivosLocal>();
			services.AddHttpContextAccessor();

			// Agregamos la cadena de conexión
			services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("defaultConnection"), sqlServer => sqlServer.UseNetTopologySuite()));


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

			// IdentityUser: será un objeto que representa un usuario en nuestra aplicación
			// IndentityRole: será el objeto que identifica un rol en nuestra aplicación
			services.AddIdentity<IdentityUser, IdentityRole>()
			  .AddEntityFrameworkStores<ApplicationDbContext>()
			  .AddDefaultTokenProviders();

			// Configuramos esquema de autenticación
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
			  .AddJwtBearer(opciones => opciones.TokenValidationParameters = new TokenValidationParameters
			  {
				  ValidateIssuer = false,
				  ValidateAudience = false,
				  // Se refiere a que le daremos un tiempo de expiración a los tokens
				  ValidateLifetime = true,
				  // Validamos la firma con la llave privada
				  ValidateIssuerSigningKey = true,
				  // Para poder configurar esa firma con una llave
				  IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["llavejwt"])),
				  // Para no tener problemas de diferencia de tiempo a la hora de calcular si el token vención
				  ClockSkew = TimeSpan.Zero
			  });

			services.AddAuthorization(opciones =>
			{
				opciones.AddPolicy
		  (
			// Nombre de la regla
			"EsAdmin",
			// Requiero que tengas un claim cuyo tipo sea: role y le podemos pasar un arreglo de valores permitidos
			// por ahora solo nos interesa un valor, por eso no pasamos un arreglo
			policy => policy.RequireClaim("role", "admin")
		   );
			});

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

			app.UseStaticFiles();

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
