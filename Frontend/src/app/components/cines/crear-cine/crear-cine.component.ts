import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICineCreacionDTO, ICineDTO } from 'src/app/models/Cine';
import { CinesService } from 'src/app/services/cines.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css'],
})
export class CrearCineComponent {
  errores: string[] = [];

  constructor(private router: Router, private cinesService: CinesService) {}

  guardarCambios(cine: ICineCreacionDTO) {
    this.cinesService.crear(cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
