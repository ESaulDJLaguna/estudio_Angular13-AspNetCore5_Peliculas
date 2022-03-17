import { IActorPeliculaDTO } from './Actor';
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
  id: number;
  titulo: string;
  resumen: string;
  enCines: boolean;
  fechaLanzamiento: Date;
  trailer: string;
  poster: string;
  generos: IGeneroDTO[];
  actores: IActorPeliculaDTO[];
  cines: ICineDTO[];
  votoUsuario: number;
  promedioVoto: number;
}

export interface IPeliculaPostGet {
  generos: IGeneroDTO[];
  cines: ICineDTO[];
}

export interface ILandingPageDTO {
  enCines: IPeliculaDTO[];
  proximosEstrenos: IPeliculaDTO[];
}

export interface IPeliculaPutGet {
  pelicula: IPeliculaDTO;
  generosSeleccionados: IGeneroDTO[];
  generosNoSeleccionados: IGeneroDTO[];
  cinesSeleccionados: ICineDTO[];
  cinesNoSeleccionados: ICineDTO[];
  actores: IActorPeliculaDTO[];
}
