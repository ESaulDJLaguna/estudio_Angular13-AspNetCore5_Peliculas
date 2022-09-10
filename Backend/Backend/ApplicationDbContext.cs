using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend
{
	public class ApplicationDbContext : IdentityDbContext
	{
		public ApplicationDbContext(DbContextOptions options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// Trabaja con la entidad PeliculasActores
			modelBuilder.Entity<PeliculasActores>()
				// Indica quién tiene la llave. Para la entidad PeliculasActores,
				// la llave primaria estará compuesta por ActorId y PeliculaId
				.HasKey(x => new { x.ActorId, x.PeliculaId });

			modelBuilder.Entity<PeliculasGeneros>()
				.HasKey(x => new { x.PeliculaId, x.GeneroId });

			modelBuilder.Entity<PeliculasCines>()
				.HasKey(x => new { x.PeliculaId, x.CineId });


			//! ES MUY IMPORTANTE DEJAR ESTO AQUÍ O DARÁ ERROR
			base.OnModelCreating(modelBuilder);
		}

		// Nombres de las tablas
		public DbSet<Genero> Generos { get; set; }
		public DbSet<Actor> Actores { get; set; }
		public DbSet<Cine> Cines { get; set; }
		public DbSet<Pelicula> Peliculas { get; set; }
		public DbSet<PeliculasActores> PeliculasActores { get; set; }
		public DbSet<PeliculasGeneros> PeliculasGeneros { get; set; }
		public DbSet<PeliculasCines> PeliculasCines { get; set; }
		public DbSet<Rating> Ratings { get; set; }
	}
}
