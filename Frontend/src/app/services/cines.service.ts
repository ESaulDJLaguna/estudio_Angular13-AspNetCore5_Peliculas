import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICineCreacionDTO, ICineDTO } from '../models/Cine';

@Injectable({
  providedIn: 'root',
})
export class CinesService {
  private apiUrl = environment.apiUrl + 'cines';

  constructor(private http: HttpClient) {}

  public crear(cine: ICineCreacionDTO) {
    return this.http.post(this.apiUrl, cine);
  }

  public editar(id: number, cine: ICineCreacionDTO) {
    return this.http.put(`${this.apiUrl}/${id}`, cine);
  }

  public obtenerTodos(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina);
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar);

    return this.http.get<ICineDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  public obtenerPorId(id: number): Observable<ICineDTO> {
    return this.http.get<ICineDTO>(`${this.apiUrl}/${id}`);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
