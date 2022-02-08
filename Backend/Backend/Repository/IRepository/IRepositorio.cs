using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repository.IRepository
{
    public interface IRepositorio
    {
        List<Genero> ObtenerTodosLosGeneros();
    }
}
