import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../components/utilities/utilidades';
import {
  ILandingPageDTO,
  IPeliculaCreacionDTO,
  IPeliculaDTO,
  IPeliculaPostGet,
  IPeliculaPutGet,
} from '../models/Pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = environment.apiUrl + 'peliculas';

  constructor(private http: HttpClient) {}

  public obtenerLandingPage(): Observable<ILandingPageDTO> {
    return this.http.get<ILandingPageDTO>(this.apiUrl);
  }

  public obtenerPorId(id: number): Observable<IPeliculaDTO> {
    return this.http.get<IPeliculaDTO>(`${this.apiUrl}/${id}`);
  }

  public postGet(): Observable<IPeliculaPostGet> {
    return this.http.get<IPeliculaPostGet>(`${this.apiUrl}/postget`);
  }

  public putGet(id: number): Observable<IPeliculaPutGet> {
    return this.http.get<IPeliculaPutGet>(`${this.apiUrl}/putget/${id}`);
  }

  public filtrar(valores: any): Observable<any> {
    const params = new HttpParams({ fromObject: valores });

    return this.http.get<IPeliculaDTO[]>(`${this.apiUrl}/filtrar`, {
      params,
      observe: 'response',
    });
  }

  public editar(id: number, pelicula: IPeliculaCreacionDTO) {
    const formData = this.ConstruirFormData(pelicula);
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  public crear(pelicula: IPeliculaCreacionDTO): Observable<number> {
    const formData = this.ConstruirFormData(pelicula);
    return this.http.post<number>(this.apiUrl, formData);
  }

  public borrar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  private ConstruirFormData(pelicula: IPeliculaCreacionDTO): FormData {
    const formData = new FormData();
    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));
    if (pelicula.fechaLanzamiento) {
      formData.append(
        'fechaLanzamiento',
        formatearFecha(pelicula.fechaLanzamiento)
      );
    }

    if (pelicula.poster) {
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIds', JSON.stringify(pelicula.generosIds));
    formData.append('cinesIds', JSON.stringify(pelicula.cinesIds));
    formData.append('actoresIds', JSON.stringify(pelicula.actoresIds));

    return formData;
  }
}
