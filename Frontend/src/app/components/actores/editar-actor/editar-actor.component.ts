import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActorCreacionDTO } from 'src/app/models/IActor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  modelo: IActorCreacionDTO = {
    nombre: 'Scarlett Johansson',
    fechaNacimiento: new Date(),
  };

  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params) => {
      // console.log(params.id);
    });
  }

  guardarCambios(actor: IActorCreacionDTO) {
    console.log(actor);
  }
}
