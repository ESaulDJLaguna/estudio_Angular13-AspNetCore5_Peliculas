import { Component, OnInit } from '@angular/core';
import { IPeliculaCreacionDTO, IPeliculaDTO } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  modelo: IPeliculaDTO = {
    titulo: 'Frozen 2',
    trailer: 'https://www.youtube.com/watch?v=Zi4LMpSDccc',
    enCines: true,
    resumen: '# Frozen 2',
    fechaLanzamiento: new Date(),
    poster:
      'https://i0.wp.com/noescinetodoloquereluce.com/wp-content/uploads/2019/09/frozen_two.jpg?resize=800%2C1186&ssl=1',
  };

  constructor() {}

  ngOnInit(): void {}

  guardarCambios(pelicula: IPeliculaCreacionDTO) {
    console.log(pelicula);
  }
}
