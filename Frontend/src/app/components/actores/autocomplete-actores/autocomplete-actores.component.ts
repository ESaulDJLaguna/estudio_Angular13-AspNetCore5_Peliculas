import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css'],
})
export class AutocompleteActoresComponent implements OnInit {
  // Nos permite manejar un campo de un formulario de forma individual
  control: FormControl = new FormControl();
  actores = [
    {
      nombre: 'Scarlett Johansson',
      foto: 'https://t1.pixers.pics/img-1fb6f67c/posters-scarlett-johansson.jpg?H4sIAAAAAAAAA3WOS27EIBBEr4Ml7G4wP_sGs5sbWBjwxIk_CJhklNMHK8oy6kVXtVT9Cp5HtksAF44SEuyr91uAZd2qy2MKef0OpDeKYjPW60YQqzo_Q3LpjKRlvaGtYFRyThUbmvHL1uRu0wd5KyXmESD3XVxf9V1dLoPbM3BkGtCAHMwwSCeER-en2OZiD2-TbwW-FHbxeFC8pvlrohGpvhqUtO6kVjorq5D3-GjgH96vhpqC-w20BC0uM91vWmoxaSOlYhWvuOSLnY3ihlnB1eIYcscnOWs7h2Gx1s9m6n4AFqtabDEBAAA=',
      personaje: '',
    },
    {
      nombre: 'Elizabeth Olsen',
      foto: 'https://www.latercera.com/resizer/ot8Jkg6MR1gE7S2Zdyg14ruta0Q=/380x570/smart/cloudfront-us-east-1.images.arcpublishing.com/copesa/XYOJ6VYII5BSLK6RLP5TDNTSOU.jpg',
      personaje: '',
    },
    {
      nombre: 'Sora Amamiya',
      foto: 'https://m.media-amazon.com/images/M/MV5BZTE0Njg4ZjAtZTk5NS00Yjg3LTllODYtZmEzODE0ZTYzZjZkXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_.jpg',
      personaje: '',
    },
  ];

  actoresOriginal = this.actores;
  actoresSeleccionados = [];
  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];
  // Haremos referencia a nuestra tabla
  @ViewChild(MatTable) table: MatTable<any>;

  constructor() {}

  ngOnInit(): void {
    // Como control está asociado al input de la plantilla, cada vez que el usuario escriba
    // algo, se disparará este evento
    this.control.valueChanges.subscribe((valor) => {
      valor = valor.toString().toLowerCase();

      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(
        (actor) => actor.nombre.toLowerCase().indexOf(valor) !== -1
      );
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
