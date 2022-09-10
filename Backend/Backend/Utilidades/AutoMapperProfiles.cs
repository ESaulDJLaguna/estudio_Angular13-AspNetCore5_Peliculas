using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using NetTopologySuite.Geometries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Utilidades
{
	public class AutoMapperProfiles : Profile
	{
		public AutoMapperProfiles(GeometryFactory geometryFactory)
		{
			CreateMap<Genero, GeneroDTO>().ReverseMap();

			// Queremos pasar de GeneroCreacionDTO a Genero
			CreateMap<GeneroCreacionDTO, Genero>();

			// Queremos pasar de Actor a ActorDTO y también de manera inversa
			CreateMap<Actor, ActorDTO>().ReverseMap();

			// Queremos pasar de ActorCreacionDTO a Actor, pero no al revés.
			// Pero queremos ignorar una propiedad, queremos ignorar la foto,
			// ya que esta la trataremos de una manera especial
			CreateMap<ActorCreacionDTO, Actor>().ForMember(x => x.Foto, options => options.Ignore());

			// Tenemos que hacer un mapeo especial para el miembro que es ubicación
			CreateMap<CineCreacionDTO, Cine>().
				ForMember(x => x.Ubicacion, x => x.MapFrom(dto =>
				// Realizamos el mapeo de Longitud y Latitud al tipo Point que es la Ubicación
				geometryFactory.CreatePoint(new Coordinate(dto.Longitud, dto.Latitud))));

			CreateMap<Cine, CineDTO>()
				// Mapearemos individualmente latitud y longitud
				.ForMember(x => x.Latitud, dto => dto.MapFrom(campo => campo.Ubicacion.Y))
				.ForMember(x => x.Longitud, dto => dto.MapFrom(campo => campo.Ubicacion.X));

			CreateMap<PeliculaCreacionDTO, Pelicula>()
				// Ignoramos el poster porque se manejará de manera especial
				.ForMember(x => x.Poster, opciones => opciones.Ignore())
				// Haremos el mapeo para las propiedades: PeliculasActores, PeliculasGeneros y PeliculasCines
				// Encapsularemos la operación de mapeo en un método
				.ForMember(x => x.PeliculasGeneros, opciones => opciones.MapFrom(MapearPeliculasGeneros))
				.ForMember(x => x.PeliculasCines, opciones => opciones.MapFrom(MapearPeliculasCines))
				.ForMember(x => x.PeliculasActores, opciones => opciones.MapFrom(MapearPeliculasActores));

			CreateMap<Pelicula, PeliculaDTO>()
				.ForMember(x => x.Generos, options => options.MapFrom(MappearPeliculasGeneros))
				.ForMember(x => x.Actores, options => options.MapFrom(MappearPeliculasActores))
				.ForMember(x => x.Cines, options => options.MapFrom(MappearPeliculasCines));

			CreateMap<IdentityUser, UsuarioDTO>();
		}

		private List<CineDTO> MappearPeliculasCines(Pelicula pelicula, PeliculaDTO peliculaDTO)
		{
			var resultado = new List<CineDTO>();

			if (pelicula.PeliculasCines != null)
			{
				foreach (var peliculasCines in pelicula.PeliculasCines)
				{
					resultado.Add(new CineDTO()
					{
						Id = peliculasCines.CineId,
						Nombre = peliculasCines.Cine.Nombre,
						Latitud = peliculasCines.Cine.Ubicacion.Y,
						Longitud = peliculasCines.Cine.Ubicacion.X
					});
				}
			}

			return resultado;
		}

		private List<PeliculaActorDTO> MappearPeliculasActores(Pelicula pelicula, PeliculaDTO peliculaDTO)
		{
			var resultado = new List<PeliculaActorDTO>();

			if (pelicula.PeliculasActores != null)
			{
				foreach (var actorPeliculas in pelicula.PeliculasActores)
				{
					resultado.Add(new PeliculaActorDTO()
					{
						Id = actorPeliculas.ActorId,
						Nombre = actorPeliculas.Actor.Nombre,
						Foto = actorPeliculas.Actor.Foto,
						Orden = actorPeliculas.Orden,
						Personaje = actorPeliculas.Personaje
					});
				}
			}

			return resultado;
		}

		private List<GeneroDTO> MappearPeliculasGeneros(Pelicula pelicula, PeliculaDTO peliculaDTO)
		{
			var resultado = new List<GeneroDTO>();

			if (pelicula.PeliculasGeneros != null)
			{
				foreach (var genero in pelicula.PeliculasGeneros)
				{
					resultado.Add(new GeneroDTO() { Id = genero.GeneroId, NombreGenero = genero.Genero.NombreGenero });
				}
			}

			return resultado;
		}

		private List<PeliculasGeneros> MapearPeliculasGeneros(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
		{
			var resultado = new List<PeliculasGeneros>();

			if (peliculaCreacionDTO.GenerosIds == null) { return resultado; }

			foreach (var id in peliculaCreacionDTO.GenerosIds)
			{
				resultado.Add(new PeliculasGeneros() { GeneroId = id });
			}

			return resultado;
		}

		private List<PeliculasCines> MapearPeliculasCines(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
		{
			var resultado = new List<PeliculasCines>();

			if (peliculaCreacionDTO.CinesIds == null) { return resultado; }

			foreach (var id in peliculaCreacionDTO.CinesIds)
			{
				resultado.Add(new PeliculasCines() { CineId = id });
			}

			return resultado;
		}

		private List<PeliculasActores> MapearPeliculasActores(PeliculaCreacionDTO peliculaCreacionDTO, Pelicula pelicula)
		{
			var resultado = new List<PeliculasActores>();

			if (peliculaCreacionDTO.ActoresIds == null) { return resultado; }

			foreach (var actor in peliculaCreacionDTO.ActoresIds)
			{
				resultado.Add(new PeliculasActores() { ActorId = actor.Id, Personaje = actor.Personaje });
			}

			return resultado;
		}
	}
}
