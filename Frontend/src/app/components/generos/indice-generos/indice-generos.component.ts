import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IGeneroDTO } from 'src/app/models/Genero';
import { GenerosService } from 'src/app/services/generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css'],
})
export class IndiceGenerosComponent implements OnInit {
  generos: IGeneroDTO[];
  columnasAMostrar = ['id', 'nombreGenero', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10; // Por defecto serán 10

  constructor(private generosService: GenerosService) {}

  ngOnInit(): void {
    this.generosService.obtenerTodos().subscribe(
      (respuesta: HttpResponse<IGeneroDTO[]>) => {
        this.generos = respuesta.body;
        console.log(respuesta.headers.get('cantidadTotalRegistros'));
        this.cantidadTotalRegistros = respuesta.headers.get(
          'cantidadTotalRegistros'
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
