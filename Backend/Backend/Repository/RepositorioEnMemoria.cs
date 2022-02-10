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

        public async Task<Genero> ObtenerPorId(int Id)
        {
            //await Task.Delay(TimeSpan.FromSeconds(3));
            await Task.Delay(1);
            // FirstOrDefault devuelve el género que coincida con un id o nulo si no lo encuentra
            return _generos.FirstOrDefault(x => x.Id == Id);
        }
    }
}
