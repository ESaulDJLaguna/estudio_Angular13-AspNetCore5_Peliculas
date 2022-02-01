import { Component, OnInit } from '@angular/core';
import { IActorCreacionDTO } from 'src/app/models/IActor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css'],
})
export class CrearActorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  guardarCambios(actor: IActorCreacionDTO) {
    console.log(actor);
  }
}
