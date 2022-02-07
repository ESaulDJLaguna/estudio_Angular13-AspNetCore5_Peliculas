import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMultipleSelectorModel } from 'src/app/models/MultipleSelectorModel';
import { IPeliculaCreacionDTO, IPeliculaDTO } from 'src/app/models/Pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css'],
})
export class FormularioPeliculaComponent implements OnInit {
  form: FormGroup;
  @Output() onSubmit: EventEmitter<IPeliculaCreacionDTO> =
    new EventEmitter<IPeliculaCreacionDTO>();
  @Input() modelo: IPeliculaDTO;
  generosNoSeleccionados: IMultipleSelectorModel[] = [
    { llave: 1, valor: 'Drama' },
    { llave: 2, valor: 'Acción' },
    { llave: 3, valor: 'Comedia' },
  ];
  generosSeleccionados: IMultipleSelectorModel[] = [];
  cinesNoSeleccionados: IMultipleSelectorModel[] = [
    { llave: 1, valor: 'Sambil' },
    { llave: 2, valor: 'Agora' },
    { llave: 3, valor: 'Acrópolis' },
  ];
  cinesSeleccionados: IMultipleSelectorModel[] = [];

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
      generosId: '',
      cinesId: '',
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
    const cinesIds = this.cinesSeleccionados.map((val) => val.llave);
    this.form.get('generosId').setValue(generosIds);
    this.form.get('cinesId').setValue(cinesIds);
    this.onSubmit.emit(this.form.value);
  }

  generosSeleccionadosPadre(generosSeleccionados: IMultipleSelectorModel[]) {
    this.generosSeleccionados = generosSeleccionados;
  }

  cinesSeleccionadosPadre(cinesSeleccionados: IMultipleSelectorModel[]) {
    this.cinesSeleccionados = cinesSeleccionados;
  }
}
