import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGeneroCreacionDTO } from 'src/app/models/IGenero';
import { primeraLetraMayuscula } from '../../utilities/validators/primeraLetraMayuscula';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css'],
})
export class FormularioGeneroComponent implements OnInit {
  form: FormGroup;
  @Input()
  modelo: IGeneroCreacionDTO;
  @Output()
  onSubmit: EventEmitter<IGeneroCreacionDTO> = new EventEmitter<IGeneroCreacionDTO>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required, primeraLetraMayuscula()],
        },
      ],
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios() {
    // Con la propiedad 'value', accedemos a toda la información del formulario
    this.onSubmit.emit(this.form.value);
  }

  obtenerErrorCampoNombre() {
    var campo = this.form.get('nombre');

    if (campo.hasError('required')) {
      return 'El campo nombre es requerido';
    }

    if (campo.hasError('primeraLetraMayuscula')) {
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }
}
