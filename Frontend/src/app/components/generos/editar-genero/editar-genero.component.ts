import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IGeneroCreacionDTO, IGeneroDTO } from 'src/app/models/Genero';
import { GenerosService } from 'src/app/services/generos.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css'],
})
export class EditarGeneroComponent implements OnInit {
  modelo: IGeneroDTO;
  errores: string[] = [];

  constructor(
    private router: Router,
    private generosService: GenerosService,
    // Se utiliza para extraer las variables de ruta de la URL
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leemos los parámetros de la url
    this.activatedRouter.params.subscribe((params) => {
      // Buscamos el parámetro id (que definimos como una variable de ruta)
      // y se pasa como parámetro a la petición get
      this.generosService.obtenerPorId(params.id).subscribe(
        (genero) => {
          this.modelo = genero;
        },
        // Como buena practica se trabaja con el error. Si el género no fue
        // encontrado, nos devuelve un 404, entonces reedirigiremos
        // al usuario al listado de géneros
        () => this.router.navigate(['/generos'])
      );
    });
  }

  guardarCambios(genero: IGeneroCreacionDTO) {
    // Pasamos como parámetros el id y el género a editar
    this.generosService.editar(this.modelo.id, genero).subscribe(
      () => {
        this.router.navigate(['/generos']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
