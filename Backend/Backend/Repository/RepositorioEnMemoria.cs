using Backend.Models;
using Backend.Repository.IRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Repository
{
    public class RepositorioEnMemoria : IRepositorio
    {
        // Listado de todos los géneros
        private List<Genero> _generos;

        // Constructor
        public RepositorioEnMemoria()
        {
            // Inicializamos datos de prueba
            _generos = new List<Genero>()
            {
                new Genero(){ Id = 1, NombreGenero = "Comedia" },
                new Genero(){ Id = 2, NombreGenero = "Acción" }
            };
        }

        // Método que devuelve el listado de géneros
        public List<Genero> ObtenerTodosLosGeneros()
        {
            return _generos;
        }
    }
}
