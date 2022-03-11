import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { IGeneroDTO } from 'src/app/models/Genero';
import { IPeliculaDTO } from 'src/app/models/Pelicula';
import { GenerosService } from 'src/app/services/generos.service';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  form: FormGroup;
  generos: IGeneroDTO[] = [];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;
  peliculas: IPeliculaDTO[] = [];
  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.cargarDatos();
  }

  cargarDatos() {
    this.generosService.obtenerTodos().subscribe((generos) => {
      this.generos = generos;

      this.leerValoresURL();
      this.buscarPeliculas(this.form.value);

      // 'valores', representa los valores que tiene actualmente el formulario
      this.form.valueChanges.subscribe((valores) => {
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      });
    });
  }

  private leerValoresURL() {
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};

      if (params.titulo) {
        objeto.titulo = params.titulo;
      }

      if (params.generoId) {
        objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos) {
        objeto.proximosEstrenos = params.proximosEstrenos;
      }

      if (params.enCines) {
        objeto.enCines = params.enCines;
      }

      this.form.patchValue(objeto);
    });
  }

  private escribirParametrosBusquedaEnURL() {
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo) {
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != '0') {
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos) {
      queryStrings.push(
        `proximosEstrenos=${valoresFormulario.proximosEstrenos}`
      );
    }

    if (valoresFormulario.enCines) {
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any) {
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
    this.peliculasService.filtrar(valores).subscribe((response) => {
      this.peliculas = response.body;
      this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    });
  }

  limpiar() {
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

  borrado() {
    this.cargarDatos();
  }
}
