import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMultipleSelectorModel } from 'src/app/models/MultipleSelectorModel';
import { IPeliculaCreacionDTO } from 'src/app/models/Pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css'],
})
export class CrearPeliculaComponent implements OnInit {
  errores: string[] = [];
  generosNoSeleccionados: IMultipleSelectorModel[];
  cinesNoSeleccionados: IMultipleSelectorModel[];

  constructor(
    private peliculasService: PeliculasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(
      (resultado) => {
        // Hacemos el mapeo de géneros a géneros no seleccionados
        this.generosNoSeleccionados = resultado.generos.map((genero) => {
          return <IMultipleSelectorModel>{
            llave: genero.id,
            valor: genero.nombreGenero,
          };
        });

        // Hacemos el mapeo de cines a cines no seleccionados
        this.cinesNoSeleccionados = resultado.cines.map((cine) => {
          return <IMultipleSelectorModel>{
            llave: cine.id,
            valor: cine.nombre,
          };
        });
      },
      (error) => console.error(error)
    );
  }

  guardarCambios(pelicula: IPeliculaCreacionDTO) {
    this.peliculasService.crear(pelicula).subscribe(
      (id: number) => {
        this.router.navigate(['/pelicula/' + id]);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
