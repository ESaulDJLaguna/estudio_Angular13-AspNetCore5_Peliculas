import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { IActorPeliculaDTO } from 'src/app/models/Actor';
import { ActoresService } from 'src/app/services/actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css'],
})
export class AutocompleteActoresComponent implements OnInit {
  // Tendremos que pasar los actores seleccionados cuando estemos en modo edición
  @Input() actoresSeleccionados: IActorPeliculaDTO[] = [];
  // Haremos referencia a nuestra tabla
  @ViewChild(MatTable) table: MatTable<any>;
  actoresAMostrar: IActorPeliculaDTO[] = [];
  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];
  // Nos permite manejar un campo de un formulario de forma individual
  control: FormControl = new FormControl();

  constructor(private actoresService: ActoresService) {}

  ngOnInit(): void {
    // Como control está asociado al input de la plantilla, cada vez que el usuario escriba
    // algo, se disparará este evento
    this.control.valueChanges.subscribe((nombre) => {
      if (typeof nombre === 'string' && nombre) {
        this.actoresService.obtenerPorNombre(nombre).subscribe((actores) => {
          this.actoresAMostrar = actores;
        });
      }
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    // Nos mostrará la información del actor seleccionado
    console.log(event.option.value);
    // Recuperamos el nombre del actor seleccionado
    let actorSeleccionado = event.option.value.nombre;
    // true si el actor ya está en la lista de actores seleccionados
    let enActoresSeleccionados = false;
    // Buscamos al actor en la lista de seleccionados
    this.actoresSeleccionados.forEach((actor) => {
      // Si el actor ya se seleccionó anteriormente
      if (actorSeleccionado === actor.nombre) {
        // la variable será true y no se volverá a agregar a la lista
        enActoresSeleccionados = true;
      }
    });
    // Si el NO está en la lista
    if (!enActoresSeleccionados) {
      // lo agregamos al arreglo de actores selsccionados
      this.actoresSeleccionados.push(event.option.value);
      // Verificamos que la tabla no sea null
      if (this.table !== undefined) {
        // Si no lo es, renderizará las filas (mostrará)
        this.table.renderRows();
      }
    }
    this.control.patchValue('');
  }

  eliminar(actor) {
    // Buscamos en el arreglo de actores seleccionados a un actor por su nombre
    // y retorna el índice donde está dentro del arreglo
    const indice = this.actoresSeleccionados.findIndex(
      (a) => a.nombre === actor.nombre
    );
    // Eliminamos un elemento a partir del índice obtenido
    this.actoresSeleccionados.splice(indice, 1);
    // Volvermos a renderizar las filas de la tabla
    this.table.renderRows();
  }
  // Nos permitirá reordenar los elementos del arreglo actoresSeleccionados
  // según el arrastre realizado en la plantilla
  finalizaArrastre(event: CdkDragDrop<any[]>) {
    const indicePrevio = this.actoresSeleccionados.findIndex(
      (actor) => actor === event.item.data
    );
    // Función auxiliar que nos da angular material que nos facilita
    // intercambair los elementos de un arreglo
    moveItemInArray(
      this.actoresSeleccionados,
      indicePrevio,
      event.currentIndex
    );
    this.table.renderRows();
  }
}
