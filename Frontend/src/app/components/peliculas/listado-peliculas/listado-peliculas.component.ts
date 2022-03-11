import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPeliculaDTO } from 'src/app/models/Pelicula';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css'],
})
export class ListadoPeliculasComponent implements OnInit {
  @Input() peliculas: IPeliculaDTO[];
  @Output() borrado: EventEmitter<void> = new EventEmitter<void>();

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {}

  borrar(peliculaId: number): void {
    this.peliculasService.borrar(peliculaId).subscribe(() => {
      // Quiero disparar un evento que me permita avisarle al
      // componente padre que se ha borrado una película
      this.borrado.emit();
    });
  }
}
