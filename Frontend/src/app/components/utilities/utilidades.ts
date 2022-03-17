export function toBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function parsearErroresAPI(response: any): string[] {
  const resultado: string[] = [];

  if (response.error) {
    // A veces el error es solo una cadena
    if (typeof response.error === 'string') {
      resultado.push(response.error);
    } else if (Array.isArray(response.error)) {
      // Se espera que 'response.error' sea un arreglo de objetos y cada
      // objeto con una propiedad llamada 'description' que contiene el mensaje de error
      response.error.forEach((valor) => resultado.push(valor.description));
    } else {
      // El error es un objeto con una llave (campo que tiene la regla) y un valor (arreglo de errores de validación)
      const mapaErrores = response.error.errors;
      // Convierte el objeto en un arreglo, tanto la llave como el valor son elementos independientes del arreglo
      const entradas = Object.entries(mapaErrores);
      // Recorre el arreglo
      entradas.forEach((arreglo: any[]) => {
        const campo = arreglo[0];
        arreglo[1].forEach((mensajeError) => {
          resultado.push(`${campo}: ${mensajeError}`);
        });
      });
    }
  }

  return resultado;
}

export function formatearFecha(date: Date) {
  // Convertimos la fecha si la estamos obteniendo en un formato inesperado
  date = new Date(date);
  const formato = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Agregamos dos comas extras porque el mes es el primer
  // elemento del arreglo, el día el tercer y el año el quinto.
  // Esto se hace así porque el método formatToParts de la clase
  // DateTimeFormar() retorna la fecha en forma: mm/dd/yyyy, por lo
  // que en la respuesta se incluyen las diagonales
  const [{ value: month }, , { value: day }, , { value: year }] =
    formato.formatToParts(date);

  return `${year}-${month}-${day}`;
}
