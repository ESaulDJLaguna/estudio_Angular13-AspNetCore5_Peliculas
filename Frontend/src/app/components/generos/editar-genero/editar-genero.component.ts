import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IGeneroCreacionDTO } from 'src/app/models/Genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  modelo: IGeneroCreacionDTO = { nombreGenero: 'Drama' };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  guardarCambios(genero: IGeneroCreacionDTO) {
    //TODO. GUARDAR LOS CAMBIOS
    console.log(genero);
    this.router.navigate(['generos']);
  }
}
