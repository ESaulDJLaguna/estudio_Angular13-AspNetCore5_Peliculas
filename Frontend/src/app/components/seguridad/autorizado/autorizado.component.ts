import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css'],
})
export class AutorizadoComponent implements OnInit {
  @Input() rol: string;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {}

  estaAutorizado(): boolean {
    // Si hay un rol la autorización estará definida por el hecho de que
    // el usuario tenga un rol que coincida con el rol definido en this.rol
    // Si no hay un rol definido, entonces definiremos que autorizado significa
    // que simplemente el usuario esté logueado
    if (this.rol) {
      return this.seguridadService.obtenerRol() === this.rol;
    } else {
      return this.seguridadService.estaLogueado();
    }
  }
}
