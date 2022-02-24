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
