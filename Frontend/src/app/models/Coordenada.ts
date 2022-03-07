export interface ICoordenada {
  latitud: number;
  longitud: number;
}

// La idea es que en el mapa quiero mostrar el nombre
// del cine que se está mostrando en pantalla y para
// eso tenemos que colocar dicho valor en algún lugar
export interface ICoordenadaConMensaje extends ICoordenada {
  mensaje: string;
}
