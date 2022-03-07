import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICineCreacionDTO, ICineDTO } from 'src/app/models/Cine';
import { CinesService } from 'src/app/services/cines.service';
import { parsearErroresAPI } from '../../utilities/utilidades';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css'],
})
export class EditarCineComponent implements OnInit {
  modelo: ICineDTO;
  errores: string[] = [];

  constructor(
    private router: Router,
    private cinesService: CinesService,
    // Se utiliza para extraer las variables de ruta de la URL
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leemos los parámetros de la url
    this.activatedRouter.params.subscribe((params) => {
      // Buscamos el parámetro id (que definimos como una variable de ruta)
      // y se pasa como parámetro a la petición get
      this.cinesService.obtenerPorId(params.id).subscribe(
        (cine) => {
          this.modelo = cine;
        },
        () => this.router.navigate(['/cines'])
      );
    });
  }

  guardarCambios(cine: ICineCreacionDTO) {
    this.cinesService.editar(this.modelo.id, cine).subscribe(
      () => {
        this.router.navigate(['/cines']);
      },
      (error) => (this.errores = parsearErroresAPI(error))
    );
  }
}
