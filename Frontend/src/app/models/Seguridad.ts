export interface ICredencialesUsuario {
  email: string;
  password: string;
}

export interface IRespuestaAutenticacion {
  token: string;
  expiracion: Date;
}

export interface IUsuarioDTO {
  id: string;
  email: string;
}
