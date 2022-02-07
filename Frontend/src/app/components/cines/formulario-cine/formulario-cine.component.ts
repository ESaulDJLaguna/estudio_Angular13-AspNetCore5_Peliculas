import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICineCreacionDTO } from 'src/app/models/Cine';
import { ICoordenada } from 'src/app/models/Coordenada';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  form: FormGroup;
  @Input()
  modelo: ICineCreacionDTO;
  @Output()
  guardarCambios: EventEmitter<ICineCreacionDTO> = new EventEmitter<ICineCreacionDTO>();
  coordenadaInicial: ICoordenada[] = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      latitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      longitud: [
        '',
        {
          validators: [Validators.required],
        },
      ],
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({
        latitud: this.modelo.latitud,
        longitud: this.modelo.longitud,
      });
    }
  }

  coordenadaSeleccionada(coordenada: ICoordenada) {
    this.form.patchValue(coordenada);
  }

  OnSubmit() {
    this.guardarCambios.emit(this.form.value);
  }
}
