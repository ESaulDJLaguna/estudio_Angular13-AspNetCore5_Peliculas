using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repository.IRepository
{
    public interface IRepositorio
    {
        Task<Genero> ObtenerPorId(int Id);
        List<Genero> ObtenerTodosLosGeneros();
    }
}
