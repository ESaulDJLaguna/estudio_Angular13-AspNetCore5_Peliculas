import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMultipleSelectorModel } from 'src/app/models/MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css'],
})
export class SelectorMultipleComponent implements OnInit {
  @Input() NoSeleccionados: IMultipleSelectorModel[] = [];
  @Input() Seleccionados: IMultipleSelectorModel[] = [];
  @Output() datosSeleccioandos: EventEmitter<IMultipleSelectorModel[]> =
    new EventEmitter<IMultipleSelectorModel[]>();

  constructor() {}

  ngOnInit(): void {}

  seleccionar(item: IMultipleSelectorModel, index: number) {
    this.Seleccionados.push(item);
    this.NoSeleccionados.splice(index, 1);
    this.datosSeleccioandos.emit(this.Seleccionados);
  }

  deseleccionar(item: IMultipleSelectorModel, index: number) {
    this.NoSeleccionados.push(item);
    this.Seleccionados.splice(index, 1);
    this.datosSeleccioandos.emit(this.Seleccionados);
  }

  seleccionarTodo() {
    this.Seleccionados.push(...this.NoSeleccionados);
    this.NoSeleccionados = [];
    this.datosSeleccioandos.emit(this.Seleccionados);
  }

  deseleccionarTodo() {
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
    this.datosSeleccioandos.emit(this.Seleccionados);
  }
}
