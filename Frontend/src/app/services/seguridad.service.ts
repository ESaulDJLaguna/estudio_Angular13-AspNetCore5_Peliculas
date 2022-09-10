import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ICredencialesUsuario,
  IRespuestaAutenticacion,
  IUsuarioDTO,
} from '../models/Seguridad';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  apiUrl = environment.apiUrl + 'cuentas';
  //! Definimos las llaves del local storage
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Se devolverá si el usuario está registrado o no
  estaLogueado(): boolean {
    const token = localStorage.getItem(this.llaveToken);

    // Si no encontró nada guardado, significa que no está logueado
    if (!token) {
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);

    // Si no ha pasado la fecha de expiración
    if (expiracionFecha <= new Date()) {
      // Si ya pasó la fecha de expiración, haremos un logout
      this.logout();
      return false;
    }

    return true;
  }

  logout() {
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
    this.router.navigate(['']);
  }

  obtenerRol(): string {
    return this.obtenerCampoJWT(this.campoRol);
  }

  obtenerCampoJWT(campo: string): string {
    // Tomaremos el token y obtendremos el valor de uno de los claims
    const token = localStorage.getItem(this.llaveToken);

    if (!token) {
      return '';
    }

    // Hacemos un split por punto, recordemos que un token se divide
    // en tres partes, y la segunda parte (arreglo [1]) es la de los datos
    // atob: decodifica una cadena de datos que ha sido codificada utilizando la codificación base-64
    // JSON.parse, convierte un objeto de cadenas con notación JSON a un objeto javascript
    let dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo];
  }

  registrar(
    credenciales: ICredencialesUsuario
  ): Observable<IRespuestaAutenticacion> {
    return this.httpClient.post<IRespuestaAutenticacion>(
      this.apiUrl + '/crear',
      credenciales
    );
  }

  login(
    credenciales: ICredencialesUsuario
  ): Observable<IRespuestaAutenticacion> {
    return this.httpClient.post<IRespuestaAutenticacion>(
      this.apiUrl + '/login',
      credenciales
    );
  }

  guardarToken(respuestaAutenticacion: IRespuestaAutenticacion) {
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(
      this.llaveExpiracion,
      respuestaAutenticacion.expiracion.toString()
    );
  }

  obtenerToken() {
    return localStorage.getItem(this.llaveToken);
  }

  //!MODIFICADO
  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.httpClient.get<IUsuarioDTO[]>(
      `${this.apiUrl}/listadousuarios`,
      {
        observe: 'response',
        params,
      }
    );
  }

  hacerAdmin(usuarioId: string) {
    // En el endpoint de hacerAdmin recibimos un string y Angular necesita que le digamos
    // que el Content-Type es application/json cuando enviamos un string porque de otro
    // modo él por defecto dice que el Content-Type es text-plain
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiUrl}/hacerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  removerAdmin(usuarioId: string) {
    // En el endpoint de hacerAdmin recibimos un string y Angular necesita que le digamos
    // que el Content-Type es application/json cuando enviamos un string porque de otro
    // modo él por defecto dice que el Content-Type es text-plain
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(
      `${this.apiUrl}/removerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }
}
