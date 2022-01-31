import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  peliculasEnCines;
  peliculasProximosEstrenos;

  constructor() {}

  ngOnInit(): void {
    this.peliculasEnCines = [
      {
        titulo: 'Spider-Man',
        fechaLanzamiento: new Date(),
        precio: 1400.99,
        poster:
          'https://m.media-amazon.com/images/I/810OkkP0LnL._AC_SY679_.jpg',
      },
      {
        titulo: 'Moana',
        fechaLanzamiento: new Date('2016-11-14'),
        precio: 300.99,
        poster:
          'https://m.media-amazon.com/images/I/71t7-smAl3L._AC_SY679_.jpg',
      },
    ];
    this.peliculasProximosEstrenos = [];
  }
}
