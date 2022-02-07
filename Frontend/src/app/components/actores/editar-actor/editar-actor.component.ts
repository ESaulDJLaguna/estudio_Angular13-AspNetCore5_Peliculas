import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IActorCreacionDTO, IActorDTO } from 'src/app/models/Actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css'],
})
export class EditarActorComponent implements OnInit {
  modelo: IActorDTO = {
    nombre: 'Scarlett Johansson',
    fechaNacimiento: new Date(),
    foto: 'https://t1.pixers.pics/img-1fb6f67c/posters-scarlett-johansson.jpg?H4sIAAAAAAAAA3WOS27EIBBEr4Ml7G4wP_sGs5sbWBjwxIk_CJhklNMHK8oy6kVXtVT9Cp5HtksAF44SEuyr91uAZd2qy2MKef0OpDeKYjPW60YQqzo_Q3LpjKRlvaGtYFRyThUbmvHL1uRu0wd5KyXmESD3XVxf9V1dLoPbM3BkGtCAHMwwSCeER-en2OZiD2-TbwW-FHbxeFC8pvlrohGpvhqUtO6kVjorq5D3-GjgH96vhpqC-w20BC0uM91vWmoxaSOlYhWvuOSLnY3ihlnB1eIYcscnOWs7h2Gx1s9m6n4AFqtabDEBAAA=',
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
