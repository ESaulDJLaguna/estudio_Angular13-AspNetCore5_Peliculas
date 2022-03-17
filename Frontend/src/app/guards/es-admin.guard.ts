import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/seguridad.service';

@Injectable({
  providedIn: 'root',
})
export class EsAdminGuard implements CanActivate {
  constructor(
    private seguridadService: SeguridadService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Nuestra clase se llama EsAdminGuard, por lo que estamos esperando que nuestro usuario sea administrador
    if (this.seguridadService.obtenerRol() === 'admin') {
      return true;
    }
    // Si el usuario no es administrador, llevaremos al usuario a un componente de login
    this.router.navigate(['/login']);
    // Impediremos al usuario acceder a esta ruta
    return false;
  }
}
