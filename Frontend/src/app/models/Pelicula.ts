import { IActorDTO, IActorPeliculaDTO } from './Actor';
import { ICineDTO } from './Cine';
import { IGeneroDTO } from './Genero';

export interface IPeliculaCreacionDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: File;
  generosIds: number[];
  actoresIds: number[];
  cinesIds: number[];
}

export interface IPeliculaDTO {
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: string;
  generos: IGeneroDTO[];
  actores: IActorPeliculaDTO[];
  cines: ICineDTO[];
}

export interface PeliculaPostGet {
  generos: IGeneroDTO[];
  cines: ICineDTO[];
}
