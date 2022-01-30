import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  peliculasEnCines;
  peliculasProximosEstrenos;

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      this.peliculasEnCines = [
        {
          titulo: 'Spider-Man',
          fechaLanzamiento: new Date(),
          precio: 1400.99,
        },
        {
          titulo: 'Moana',
          fechaLanzamiento: new Date('2016-11-14'),
          precio: 300.99,
        },
      ];
    }, 1000);
    setTimeout(() => {
      this.peliculasProximosEstrenos = [
        // {
        //   titulo: 'Avengers: Endgame',
        //   fechaLanzamiento: new Date(),
        //   precio: 1400.99,
        // },
        // {
        //   titulo: 'Inception',
        //   fechaLanzamiento: new Date('2016-11-14'),
        //   precio: 300.99,
        // },
        // {
        //   titulo: 'Frozen',
        //   fechaLanzamiento: new Date(),
        //   precio: 250,
        // },
      ];
    }, 3000);
  }
}
