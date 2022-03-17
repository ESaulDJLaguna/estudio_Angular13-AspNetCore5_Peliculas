import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICredencialesUsuario } from 'src/app/models/Seguridad';

@Component({
  selector: 'app-formulario-autenticacion',
  templateUrl: './formulario-autenticacion.component.html',
  styleUrls: ['./formulario-autenticacion.component.css'],
})
export class FormularioAutenticacionComponent implements OnInit {
  form: FormGroup;
  @Input() errores: string[] = [];
  @Input() accion: string;
  @Output() onSubmit: EventEmitter<ICredencialesUsuario> =
    new EventEmitter<ICredencialesUsuario>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });
  }

  obtenerMensajeErrorEmail() {
    let campo = this.form.get('email');

    if (campo.hasError('required')) {
      return 'El campo Email es requerido';
    }

    if (campo.hasError('email')) {
      return 'El email no es válido';
    }

    return '';
  }
}
