import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICredencialesUsuario } from 'src/app/models/Seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  errores: string[] = [];

  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registrar(credenciales: ICredencialesUsuario) {
    this.seguridadService.registrar(credenciales).subscribe(
      (respuesta) => {
        this.seguridadService.guardarToken(respuesta);
        this.router.navigate(['/']);
      },
      (errores) => (this.errores = parsearErroresAPI(errores))
    );
  }
}
