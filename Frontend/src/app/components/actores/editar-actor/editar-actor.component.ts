import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IActorCreacionDTO, IActorDTO } from 'src/app/models/Actor';
import { ActoresService } from 'src/app/services/actores.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  modelo: IActorDTO;
  errores: string[] = [];

  constructor(
    private router: Router,
    private actoresService: ActoresService,
    // Se utiliza para extraer las variables de ruta de la URL
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leemos los parámetros de la url
    this.activatedRouter.params.subscribe((params) => {
      // Buscamos el parámetro id (que definimos como una variable de ruta)
      // y se pasa como parámetro a la petición get
      this.actoresService.obtenerPorId(params.id).subscribe(
        (actor) => {
          this.modelo = actor;
        },
        // Como buena practica se trabaja con el error. Si el actor no fue
        // encontrado, nos devuelve un 404, entonces reedirigiremos
        // al usuario al listado de actores
        () => this.router.navigate(['/actores'])
      );
    });
  }

  guardarCambios(actor: IActorCreacionDTO) {
    // Pasamos como parámetros el id y el género a editar
    this.actoresService.editar(this.modelo.id, actor).subscribe(
      () => {
        this.router.navigate(['/actores']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
