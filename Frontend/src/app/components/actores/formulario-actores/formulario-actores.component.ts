import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActorCreacionDTO, IActorDTO } from 'src/app/models/Actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css'],
})
export class FormularioActoresComponent implements OnInit {
  form: FormGroup;
  @Output()
  OnSubmitDatos: EventEmitter<IActorCreacionDTO> = new EventEmitter<IActorCreacionDTO>();
  @Input()
  modelo: IActorDTO;
  @Input()
  errores: string[] = [];
  imagenCambiada = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fechaNacimiento: '',
      foto: '',
      biografia: '',
    });

    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  archivoSeleccionado(file) {
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  cambioMarkdown(texto: string) {
    this.form.get('biografia').setValue(texto);
  }

  onSubmit() {
    if (!this.imagenCambiada) {
      this.form.patchValue({ foto: null });
    }
    this.OnSubmitDatos.emit(this.form.value);
  }
}
