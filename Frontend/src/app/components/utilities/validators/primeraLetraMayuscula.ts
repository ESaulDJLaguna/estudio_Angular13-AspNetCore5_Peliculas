import { AbstractControl, ValidatorFn } from '@angular/forms';

export function primeraLetraMayuscula(): ValidatorFn {
  return (control: AbstractControl) => {
    // <string> es una forma de castear a string
    const valor = <string>control.value;
    if (!valor) return;
    if (valor.length === 0) return;

    const primeraLetra = valor[0];
    if (primeraLetra !== primeraLetra.toUpperCase()) {
      return {
        /* Como se explicó antes, cada error tiene su nombre, esto se veía
				cuando se pasaba como parámetro dicho nombre a la función hasError,
				por lo tanto, esta 'primeraLetraMayuscula' será el nombre de nuestra
				validación personalizada
				*/
        primeraLetraMayuscula: {
          mensaje: 'La primera letra debe ser mayúscula',
        },
      };
    }

    return;
  };
}
