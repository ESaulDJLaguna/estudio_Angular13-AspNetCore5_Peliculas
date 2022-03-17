using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Controllers
{
  [Route("api/rating")]
  [ApiController]
  public class RatingsController : ControllerBase
  {
	private readonly UserManager<IdentityUser> userManager;
	private readonly ApplicationDbContext context;

	public RatingsController(UserManager<IdentityUser> userManager, ApplicationDbContext context)
	{
	  this.userManager = userManager;
	  this.context = context;
	}

	[HttpPost]
	[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
	public async Task<ActionResult> Post([FromBody] RatingDTO ratingDTO)
	{
	  // Voy a buscar un Claim cuyo tipo sea igual a 'email' y obtenemos su valor.
	  // Este claim coincide con el que agregamos en el método ConstruirToken() en CuentasController
	  var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
	  // Con el email puedo obtener al usuario y de ahí su id
	  var usuario = await userManager.FindByEmailAsync(email);
	  var usuarioId = usuario.Id;

	  // Una vez que tenemos el id del usuario, quiero ir a la BD y ver si ya votó por la película
	  var ratingActual = await context.Ratings
		.FirstOrDefaultAsync(x => x.PeliculaId == ratingDTO.PeliculaId && x.UsuarioId == usuarioId);

	  // El usuario no ha votado por esa película en el pasado
	  if (ratingActual == null)
	  {
		var rating = new Rating();
		rating.PeliculaId = ratingDTO.PeliculaId;
		rating.Puntuacion = ratingDTO.Puntuacion;
		rating.UsuarioId = usuarioId;
		context.Add(rating);
	  }
	  // El usuario ya ha votado por esta película. Actualizaremos la puntuación dada por el usuario
	  else
	  {
		ratingActual.Puntuacion = ratingDTO.Puntuacion;
	  }

	  await context.SaveChangesAsync();
	  return NoContent();
	}
  }
}
