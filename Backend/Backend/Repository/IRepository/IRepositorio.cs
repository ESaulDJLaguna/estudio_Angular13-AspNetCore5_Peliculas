using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repository.IRepository
{
    public interface IRepositorio
    {
				void CrearGenero(Genero genero);
				Guid ObtenerGuid();
				Task<Genero> ObtenerPorId(int Id);
        List<Genero> ObtenerTodosLosGeneros();
    }
}
