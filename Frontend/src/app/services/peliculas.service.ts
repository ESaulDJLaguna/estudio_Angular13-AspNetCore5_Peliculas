import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../components/utilities/utilidades';
import {
  IPeliculaCreacionDTO,
  IPeliculaDTO,
  PeliculaPostGet,
} from '../models/Pelicula';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private apiUrl = environment.apiUrl + 'peliculas';

  constructor(private http: HttpClient) {}

  public obtenerPorId(id: number): Observable<IPeliculaDTO> {
    return this.http.get<IPeliculaDTO>(`${this.apiUrl}/${id}`);
  }

  public postGet(): Observable<PeliculaPostGet> {
    return this.http.get<PeliculaPostGet>(`${this.apiUrl}/postget`);
  }

  public crear(pelicula: IPeliculaCreacionDTO) {
    console.log(pelicula);

    const formData = this.ConstruirFormData(pelicula);
    return this.http.post(this.apiUrl, formData);
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
