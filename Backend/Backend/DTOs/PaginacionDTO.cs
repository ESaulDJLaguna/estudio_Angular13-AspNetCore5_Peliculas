using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
	public class PaginacionDTO
	{
		private readonly int cantidadMaximaRecordsPorPagina = 50;
		private int recordsPorPagina = 10;

		public int Pagina { get; set; } = 1;
		public int RecordsPorPagina
		{
			get
			{
				return recordsPorPagina;
			}
			set
			{
				recordsPorPagina = (value > cantidadMaximaRecordsPorPagina) ? cantidadMaximaRecordsPorPagina : value;
			}
		}
	}
}
