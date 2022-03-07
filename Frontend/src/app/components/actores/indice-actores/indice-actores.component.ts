import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IActorDTO } from 'src/app/models/Actor';
import { ActoresService } from 'src/app/services/actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css'],
})
export class IndiceActoresComponent implements OnInit {
  actores: IActorDTO[];
  columnasAMostrar = ['id', 'nombreActor', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10; // Por defecto serán 10

  constructor(private actoresService: ActoresService) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.actoresService
      .obtenerTodos(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<IActorDTO[]>) => {
          this.actores = respuesta.body;
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
    this.actoresService.borrar(id).subscribe(
      () => {
        // Volveremos a cargar los registros
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
      },
      (error) => console.error(error)
    );
  }
}
