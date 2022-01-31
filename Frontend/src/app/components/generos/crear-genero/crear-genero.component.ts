import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneroCreacionDTO } from 'src/app/models/genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent {
  constructor(private router: Router) {}

  guardarCambios(genero: GeneroCreacionDTO) {
    //TODO. GUARDAR LOS CAMBIOS
    console.log(genero);
    this.router.navigate(['generos']);
  }
}
