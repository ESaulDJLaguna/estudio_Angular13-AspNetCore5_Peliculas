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
  form: FormGroup;
  @Input() errores: string[] = [];
  @Output() onSubmit: EventEmitter<IPeliculaCreacionDTO> =
    new EventEmitter<IPeliculaCreacionDTO>();
  @Input() modelo: IPeliculaDTO;
  @Input() generosNoSeleccionados: IMultipleSelectorModel[];
  generosSeleccionados: IMultipleSelectorModel[] = [];
  @Input() cinesNoSeleccionados: IMultipleSelectorModel[];
  cinesSeleccionados: IMultipleSelectorModel[] = [];
  @Input() actoresSeleccionados: IActorPeliculaDTO[] = [];

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
    this.onSubmit.emit(this.form.value);
  }

  generosSeleccionadosPadre(generosSeleccionados: IMultipleSelectorModel[]) {
    this.generosSeleccionados = generosSeleccionados;
  }

  cinesSeleccionadosPadre(cinesSeleccionados: IMultipleSelectorModel[]) {
    this.cinesSeleccionados = cinesSeleccionados;
  }
}
