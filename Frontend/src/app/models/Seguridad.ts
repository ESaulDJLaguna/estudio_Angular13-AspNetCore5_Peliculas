export interface ICredencialesUsuario {
  email: string;
  password: string;
}

export interface IRespuestaAutenticacion {
  token: string;
  expiracion: Date;
}
