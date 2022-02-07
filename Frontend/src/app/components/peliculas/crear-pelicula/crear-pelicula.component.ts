import { Component, OnInit } from '@angular/core';
import { IPeliculaCreacionDTO } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  guardarCambios(pelicula: IPeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
