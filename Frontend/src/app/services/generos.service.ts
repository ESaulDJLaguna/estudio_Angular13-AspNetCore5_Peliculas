import { HttpClient } from '@angular/common/http';
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

  public obtenerTodos(): Observable<any> {
    return this.http.get<IGeneroDTO[]>(this.apiUrl, { observe: 'response' });
  }

  public crear(genero: IGeneroCreacionDTO) {
    return this.http.post(this.apiUrl, genero);
  }
}
