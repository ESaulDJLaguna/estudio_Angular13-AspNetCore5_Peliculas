import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IActorPeliculaDTO } from 'src/app/models/Actor';
import { IMultipleSelectorModel } from 'src/app/models/MultipleSelectorModel';
import { IPeliculaCreacionDTO, IPeliculaDTO } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  @Input() actoresSeleccionados: IActorPeliculaDTO[] = [];
  @Input() cinesNoSeleccionados: IMultipleSelectorModel[];
  @Input() cinesSeleccionados: IMultipleSelectorModel[] = [];
  @Input() errores: string[] = [];
  @Input() generosNoSeleccionados: IMultipleSelectorModel[];
  @Input() generosSeleccionados: IMultipleSelectorModel[] = [];
  @Input() modelo: IPeliculaDTO;
  @Output() onSubmit: EventEmitter<IPeliculaCreacionDTO> =
    new EventEmitter<IPeliculaCreacionDTO>();
  form: FormGroup;
  imagenCambiada = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actoresIds: '',
    });
    if (this.modelo !== undefined) {
      this.form.patchValue(this.modelo);
    }
  }

  changeMarkdown(resumen: string) {
    this.form.get('resumen').setValue(resumen);
  }
  archivoSeleccionado(archivo: File) {
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  guardarCambios() {
    const generosIds = this.generosSeleccionados.map((val) => val.llave);
    this.form.get('generosIds').setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map((val) => {
      return { id: val.id, personaje: val.personaje };
    });
    this.form.get('actoresIds').setValue(actores);

    if (!this.imagenCambiada) {
      this.form.patchValue({ poster: null });
    }

    this.onSubmit.emit(this.form.value);
  }
}
