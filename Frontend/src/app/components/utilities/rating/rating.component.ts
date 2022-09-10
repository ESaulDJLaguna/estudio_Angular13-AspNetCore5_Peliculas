import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent implements OnInit {
  @Input() maximoRating = 5;
  @Input() ratingSeleccionado = 0;
  @Output() rated: EventEmitter<number> = new EventEmitter<number>();
  maximoRatingArr = [];
  votado = false;
  ratingAnterior;

  constructor(private seguridadService: SeguridadService) {}

  ngOnInit(): void {
    // Creamos un arreglo con 0s. No tiene otra utilidad más que ser
    // iterado y crear tantas estrellas como 0s hay.
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
    // Cuando se pasa el ratón sobre las estrellas, si no se selecciona
    // alguna, no se perderá el coloreado anterior (si lo hay)
    this.ratingAnterior = this.ratingSeleccionado;
  }

  manejarMouseEnter(index: number): void {
    this.ratingSeleccionado = index + 1;
  }

  manejarMouseLeave(): void {
    if (this.ratingAnterior !== 0) {
      this.ratingSeleccionado = this.ratingAnterior;
    } else {
      this.ratingSeleccionado = 0;
    }
  }

  rate(index: number): void {
    if (this.seguridadService.estaLogueado()) {
      this.ratingSeleccionado = index + 1;
      this.votado = true;
      this.ratingAnterior = this.ratingSeleccionado;
      this.rated.emit(this.ratingSeleccionado);
    } else {
      Swal.fire('Debe loguearse', 'No puede realizar esta acción', 'error');
    }
  }
}
