import { Component, OnInit } from '@angular/core';
import { ICineCreacionDTO, ICineDTO } from 'src/app/models/Cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  modelo: ICineDTO = {
    nombre: 'Sambil',
    latitud: 19.531408755687504,
    longitud: -99.02658820152284,
  };
  constructor() {}

  ngOnInit(): void {}

  guardarCambios(cine: ICineCreacionDTO) {
    console.log(cine);
  }
}
