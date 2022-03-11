import { Component, OnInit } from '@angular/core';
import { IPeliculaDTO } from 'src/app/models/Pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  peliculasEnCines: IPeliculaDTO[];
  peliculasProximosEstrenos: IPeliculaDTO[];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.peliculasService.obtenerLandingPage().subscribe((landingPage) => {
      this.peliculasEnCines = landingPage.enCines;
      this.peliculasProximosEstrenos = landingPage.proximosEstrenos;
    });
  }

  // El método borrado NO tiene qué hacer nada, solo debe volver a solicitar las películas
  borrado() {
    this.cargarDatos();
  }
}
