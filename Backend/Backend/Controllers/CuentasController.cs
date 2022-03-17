using Backend.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Controllers
{
  [Route("api/cuentas")]
  [ApiController]
  public class CuentasController : ControllerBase
  {
	private readonly UserManager<IdentityUser> userManager;
	private readonly SignInManager<IdentityUser> signInManager;
	private readonly IConfiguration configuration;

	public CuentasController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,IConfiguration configuration)
	{
	  this.userManager = userManager;
	  this.signInManager = signInManager;
	  this.configuration = configuration;
	}
	[HttpPost("crear")]
	public async Task<ActionResult<RespuestaAutenticacion>> Crear([FromBody] CredencialesUsuario credenciales)
	{
	  // En esta aplicación el userName y el Email coinciden, pero esto no es obligatorio.
	  var usuario = new IdentityUser { UserName = credenciales.Email, Email = credenciales.Email };
	  // Creamos el usuario utilizando el IdentityUser anterior
	  var resultado = await userManager.CreateAsync(usuario, credenciales.Password);

	  // Si la creación del usuario fue exitoso se retornará el token
	  if (resultado.Succeeded)
	  {
		return await ConstruirToken(credenciales);
	  }
	  else
	  {
		// Retornará los errores, por ejemplo, que la contraseña lleva mayúsculas
		// Recordemos que estamos creando un nuevo usuario
		return BadRequest(resultado.Errors);
	  }
	}

	[HttpPost("login")]
	public async Task<ActionResult<RespuestaAutenticacion>> Login([FromBody] CredencialesUsuario credenciales)
	{
	  var resultado = await signInManager.PasswordSignInAsync(credenciales.Email, credenciales.Password, isPersistent: false, lockoutOnFailure: false);

	  if(resultado.Succeeded)
	  {
		return await ConstruirToken(credenciales);
	  }
	  else
	  {
		// Por seguridad, NO se debe indicar el error al loguearse.
		return BadRequest("Login incorrecto");
	  }
	}

	private async Task<RespuestaAutenticacion> ConstruirToken(CredencialesUsuario credenciales)
	{
	  var claims = new List<Claim>()
	  {
		new Claim("email", credenciales.Email)
	  };

	  var usuario = await userManager.FindByEmailAsync(credenciales.Email);
	  // Obtenemos los claims del usuario actual de la BD
	  var claimsDB = await userManager.GetClaimsAsync(usuario);

	  // Agregamos los claims que acaban de venir de la BD al listado de arriba. Si viene vacío
	  // no pasa nada, pero si hay alguno que indica que el usuario es admin, se agrega.
	  claims.AddRange(claimsDB);

	  //! TRABAJAREMOS CON LA CONSTRUICCIÓN DEL JWT
	  // Recordemos que los JWT requieren de una llave secreta para firmarlos. Aquí obtenemos esa llave secreta
	  // Como la pusimos en un proveedor de configuración, se requiere el IConfiguration (Microsoft.Extension.Configuration)
	  var llave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["llavejwt"]));
	  // Creamos las credenciales de firma. Le pasamos la llave y el algoritmo de seguridad a utilizar
	  var creds = new SigningCredentials(llave, SecurityAlgorithms.HmacSha256);
	  // Definimos el tiempo de expiración del token. En este caso será un año de duración.
	  var expiracion = DateTime.UtcNow.AddYears(1);
	  // Construiremos el token
	  var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiracion, signingCredentials: creds);

	  return new RespuestaAutenticacion
	  {
		// Ya escribimos el token final
		Token = new JwtSecurityTokenHandler().WriteToken(token),
		Expiracion = expiracion
	  };
	}
  }
}
