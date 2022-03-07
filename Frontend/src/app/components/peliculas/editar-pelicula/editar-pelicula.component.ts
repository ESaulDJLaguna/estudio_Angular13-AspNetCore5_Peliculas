import { Component, OnInit } from '@angular/core';
import { IPeliculaCreacionDTO, IPeliculaDTO } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  modelo: IPeliculaDTO;

  constructor() {}

  ngOnInit(): void {}

  guardarCambios(pelicula: IPeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
