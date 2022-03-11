import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IActorPeliculaDTO } from 'src/app/models/Actor';
import { ICineDTO } from 'src/app/models/Cine';
import { IGeneroDTO } from 'src/app/models/Genero';
import { IMultipleSelectorModel } from 'src/app/models/MultipleSelectorModel';
import { IPeliculaCreacionDTO, IPeliculaDTO } from 'src/app/models/Pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css'],
})
export class EditarPeliculaComponent implements OnInit {
  actoresSeleccionados: IActorPeliculaDTO[];
  cinesNoSeleccionados: IMultipleSelectorModel[];
  cinesSeleccionados: IMultipleSelectorModel[];
  generosNoSeleccionados: IMultipleSelectorModel[];
  generosSeleccionados: IMultipleSelectorModel[];
  modelo: IPeliculaDTO;

  constructor(
    private peliculaService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculaService.putGet(params.id).subscribe((peliculaPutGet) => {
        this.modelo = peliculaPutGet.pelicula;

        // Debemos mapear géneros seleccionados y NO seleccionados
        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(
          (genero) => {
            return <IMultipleSelectorModel>{
              llave: genero.id,
              valor: genero.nombreGenero,
            };
          }
        );

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(
          (genero) => {
            return <IMultipleSelectorModel>{
              llave: genero.id,
              valor: genero.nombreGenero,
            };
          }
        );

        // Debemos mapear cines seleccionados y NO seleccionados
        this.cinesSeleccionados = peliculaPutGet.cinesSeleccionados.map(
          (cine) => {
            return <IMultipleSelectorModel>{
              llave: cine.id,
              valor: cine.nombre,
            };
          }
        );

        this.cinesNoSeleccionados = peliculaPutGet.cinesNoSeleccionados.map(
          (cine) => {
            return <IMultipleSelectorModel>{
              llave: cine.id,
              valor: cine.nombre,
            };
          }
        );

        this.actoresSeleccionados = peliculaPutGet.actores;
      });
    });
  }

  guardarCambios(pelicula: IPeliculaCreacionDTO) {
    this.peliculaService
      .editar(this.modelo.id, pelicula)
      .subscribe(() => this.router.navigate(['/pelicula/' + this.modelo.id]));
  }
}
