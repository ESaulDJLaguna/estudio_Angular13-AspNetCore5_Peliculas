export interface IActorDTO {
  id: number;
  nombre: string;
  fechaNacimiento: Date;
  foto: string;
  biografia: string;
}

export interface IActorCreacionDTO {
  nombre: string;
  fechaNacimiento: Date;
  foto: File;
  biografia: string;
}

export interface IActorPeliculaDTO {
  id: number;
  nombre: string;
  personaje: string;
  foto: string;
}
