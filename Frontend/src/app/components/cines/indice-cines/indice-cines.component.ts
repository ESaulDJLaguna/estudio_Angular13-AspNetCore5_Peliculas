import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICineDTO } from 'src/app/models/Cine';
import { CinesService } from 'src/app/services/cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css'],
})
export class IndiceCinesComponent implements OnInit {
  cines: ICineDTO[];
  columnasAMostrar = ['id', 'nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10; // Por defecto serán 10

  constructor(private cinesService: CinesService) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.cinesService.obtenerTodos(pagina, cantidadElementosAMostrar).subscribe(
      (respuesta: HttpResponse<ICineDTO[]>) => {
        this.cines = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get(
          'cantidadTotalRegistros'
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id: number) {
    this.cinesService.borrar(id).subscribe(
      () => {
        // Volveremos a cargar los registros
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      (error) => console.error(error)
    );
  }
}
