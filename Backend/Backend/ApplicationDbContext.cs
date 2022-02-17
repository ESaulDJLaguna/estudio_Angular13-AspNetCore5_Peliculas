using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend
{
		public class ApplicationDbContext : DbContext
		{
				public ApplicationDbContext(DbContextOptions options) : base(options)
				{
				}

				public DbSet<Genero> Generos { get; set; }
		}
}
