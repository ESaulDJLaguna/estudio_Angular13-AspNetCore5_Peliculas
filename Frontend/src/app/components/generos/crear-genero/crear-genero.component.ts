import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IGeneroCreacionDTO } from 'src/app/models/Genero';
import { GenerosService } from 'src/app/services/generos.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent {
  errores: string[] = [];
  constructor(private router: Router, private generosService: GenerosService) {}

  guardarCambios(genero: IGeneroCreacionDTO) {
    this.generosService.crear(genero).subscribe(
      () => {
        this.router.navigate(['/generos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
