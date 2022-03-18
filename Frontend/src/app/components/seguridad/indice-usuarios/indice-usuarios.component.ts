import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IUsuarioDTO } from 'src/app/models/Seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css'],
})
export class IndiceUsuariosComponent implements OnInit {
  usuarios: IUsuarioDTO[];
  columnasAMostrar = ['nombreGenero', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10; // Por defecto serán 10

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar: number) {
    this.seguridadService
      .obtenerUsuarios(pagina, cantidadElementosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<IUsuarioDTO[]>) => {
          this.usuarios = respuesta.body;
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

  hacerAdmin(usuarioId: string) {
    this.seguridadService
      .hacerAdmin(usuarioId)
      .subscribe(() =>
        Swal.fire('Exitoso', 'La operación se ha realizado', 'success')
      );
  }

  removerAdmin(usuarioId: string) {
    this.seguridadService
      .removerAdmin(usuarioId)
      .subscribe(() =>
        Swal.fire('Exitoso', 'La operación se ha realizado', 'success')
      );
  }
}
