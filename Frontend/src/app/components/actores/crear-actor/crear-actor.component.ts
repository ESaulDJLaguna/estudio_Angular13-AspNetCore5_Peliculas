import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IActorCreacionDTO } from 'src/app/models/Actor';
import { ActoresService } from 'src/app/services/actores.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent implements OnInit {
  errores: string[] = [];
  constructor(private actoresService: ActoresService, private router: Router) {}

  ngOnInit(): void {}

  guardarCambios(actor: IActorCreacionDTO) {
    // Nos suscribimos al observable para disparar la petición
    this.actoresService.crear(actor).subscribe(
      () => {
        this.router.navigate(['/actores']);
      },
      (errores) => (this.errores = parsearErroresAPI(errores))
    );
  }
}
