import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../components/utilities/utilidades';
import {
  IActorCreacionDTO,
  IActorDTO,
  IActorPeliculaDTO,
} from '../models/Actor';

@Injectable({
  providedIn: 'root',
})
export class ActoresService {
  private apiUrl = environment.apiUrl + 'actores';

  constructor(private http: HttpClient) {}

  public obtenerTodos(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina);
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar);

    return this.http.get<IActorDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  public obtenerPorId(id: number): Observable<IActorDTO> {
    return this.http.get<IActorDTO>(`${this.apiUrl}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<IActorPeliculaDTO[]> {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post<IActorPeliculaDTO[]>(
      `${this.apiUrl}/buscarPorNombre`,
      // JSON.stringify lo utilizamos para convertir a formato json
      JSON.stringify(nombre),
      { headers }
    );
  }

  public crear(actor: IActorCreacionDTO) {
    const formData = this.construirFormData(actor);

    formData.forEach((data, key) => console.log(`${key}: ${data}`));

    return this.http.post(this.apiUrl, formData);
  }

  public editar(id: number, actor: IActorCreacionDTO) {
    const formData = this.construirFormData(actor);

    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public construirFormData(actor: IActorCreacionDTO): FormData {
    const formData = new FormData();

    // Agrega los datos del actor al FormData
    formData.append('nombre', actor.nombre);
    if (actor.biografia) {
      formData.append('biografia', actor.biografia);
    }
    // Si la fecha existe, la agregamos al FormData
    if (actor.fechaNacimiento) {
      // Tenemos que parsear (formatear) la fecha
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));
    }
    if (actor.foto) {
      formData.append('foto', actor.foto);
    }

    return formData;
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
