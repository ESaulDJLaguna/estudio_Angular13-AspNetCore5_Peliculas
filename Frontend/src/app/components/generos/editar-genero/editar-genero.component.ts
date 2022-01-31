import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneroCreacionDTO } from 'src/app/models/genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  modelo: GeneroCreacionDTO = { nombre: 'Drama' };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  guardarCambios(genero: GeneroCreacionDTO) {
    //TODO. GUARDAR LOS CAMBIOS
    console.log(genero);
    this.router.navigate(['generos']);
  }
}
