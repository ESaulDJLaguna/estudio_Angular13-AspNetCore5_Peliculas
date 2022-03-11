import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGeneroCreacionDTO, IGeneroDTO } from '../models/Genero';

@Injectable({
  providedIn: 'root',
})
export class GenerosService {
  private apiUrl = environment.apiUrl + 'generos';

  constructor(private http: HttpClient) {}

  public obtenerPaginado(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina);
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar);

    return this.http.get<IGeneroDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  public obtenerTodos() {
    return this.http.get<IGeneroDTO[]>(`${this.apiUrl}/todos`);
  }

  public obtenerPorId(id: number): Observable<IGeneroDTO> {
    return this.http.get<IGeneroDTO>(`${this.apiUrl}/${id}`);
  }

  public crear(genero: IGeneroCreacionDTO) {
    return this.http.post(this.apiUrl, genero);
  }

  public editar(id: number, genero: IGeneroCreacionDTO) {
    // Pasamos el géneros para que se envíe en el
    // cuerpo de la petición http
    return this.http.put(`${this.apiUrl}/${id}`, genero);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
