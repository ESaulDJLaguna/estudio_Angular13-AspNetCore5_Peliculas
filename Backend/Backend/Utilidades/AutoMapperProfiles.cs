using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
		public class AutoMapperProfiles: Profile
		{
				public AutoMapperProfiles()
				{
						CreateMap<Genero, GeneroDTO>().ReverseMap();
						// Queremos pasar de GeneroCreacionDTO a Genero
						CreateMap<GeneroCreacionDTO, Genero>();
				}
		}
}
