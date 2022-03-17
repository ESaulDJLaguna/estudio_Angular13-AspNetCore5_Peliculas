using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
  public class RespuestaAutenticacion
  {
	public string Token { get; set; }
	public DateTime Expiracion { get; set; }
  }
}
