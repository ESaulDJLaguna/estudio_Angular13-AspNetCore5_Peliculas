import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICredencialesUsuario } from 'src/app/models/Seguridad';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  errores: string[] = [];

  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(credenciales: ICredencialesUsuario) {
    this.seguridadService.login(credenciales).subscribe(
      (respuesta) => {
        this.seguridadService.guardarToken(respuesta);
        this.router.navigate(['/']);
      },
      (errores) => (this.errores = parsearErroresAPI(errores))
    );
  }
}
