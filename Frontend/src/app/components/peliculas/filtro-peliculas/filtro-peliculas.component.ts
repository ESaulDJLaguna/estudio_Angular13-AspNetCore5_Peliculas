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
  cantidadElementos;
  // Número de películas que se mostrarán por página
  cantidadElementosAMostrar = 10;
  // Representa el formulario en la plantilla
  form: FormGroup;
  // Campos que tendrá el formulario. Se usará para inicializar form
  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false,
  };
  // Listado de géneros que se mostrarán en el <mat-select>
  generos: IGeneroDTO[] = [];
  // Pagina actual que se muestra en el paginador
  paginaActual = 1;
  // Listado de películas
  peliculas: IPeliculaDTO[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private location: Location, // Permite trabajar directamente con la url
    private activatedRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService
  ) {}

  ngOnInit(): void {
    // Inicializamos el formulario con los campos que necesitamos y sus valores iniciales
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.cargarDatos();
  }

  cargarDatos() {
    // Obtenemos los géneros desde la API
    this.generosService.obtenerTodos().subscribe((generos) => {
      this.generos = generos;

      // Si alguien copia la url de una búsqueda específica y la comparte,
      // con este método se leerán los parámetros y se llenará el formulario
      // con los datos que se están compartiendo (solo se hará cuando se carga la página)
      this.leerValoresURL();
      // Busca la película según los datos leídos en la url
      this.buscarPeliculas(this.form.value);

      // 'valueChantges se ejecuta cada vez que hay un cambio en alguno de los campos del formulario
      this.form.valueChanges.subscribe((valores) => {
        // 'valores': es un objeto que  representa los datos actuales en los campos del formulario
        // {titulo: valor, generoId: valor, proximosEstrenos: valor, enCines: valor}

        // Busca la película en la API y las muestra
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      });
    });
  }

  private leerValoresURL() {
    // Lee los queryParams de la url
    this.activatedRoute.queryParams.subscribe((params) => {
      //x var objeto: any = {};

      //x if (params.titulo) {
      //x   objeto.titulo = params.titulo;
      //x }

      //x if (params.generoId) {
      //x   objeto.generoId = Number(params.generoId);
      //x }

      //x if (params.proximosEstrenos) {
      //x   objeto.proximosEstrenos = params.proximosEstrenos;
      //x }

      //x if (params.enCines) {
      //x   objeto.enCines = params.enCines;
      //x }

      // Actualiza los datos del formulario con los parámetros de la url
      //x this.form.patchValue(objeto);
      this.form.patchValue(params);
    });
  }

  buscarPeliculas(valores: any) {
    /*
		Al objeto actual (valores) que representa los campos el formulario, le agregamos
    dos elementos más: pagina y recordsPorPagina, para enviarlos a la API
    {titulo: valor, generoId: valor, proximosEstrenos: valor, enCines: valor, pagina: valor, recordsPorPagina: valor}
		*/
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;

    // Traemos las películas desde la API y pasamos como parámetro el objeto valores, recibe
    // como resultado un objeto response
    this.peliculasService.filtrar(valores).subscribe((response) => {
      console.log(response);

      this.peliculas = response.body;
      //x this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    });
  }

  private escribirParametrosBusquedaEnURL() {
    // queryStrings almacenará un arreglo con los valores actuales de los campos del formulario modificados
    // ["titulo=valor", "generoId=valor", ...]
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

    // Remplazamos la url actual por: peliculas/buscar y los query params. En el arreglo
    // queryStrings, 'join' 'unirá' todos sus elementos separados por el caracter &
    // titulo=valor&enCines=valor... El signo ? se pone automáticamente
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  limpiar() {
    // Reemplazamos los datos actual del formulario por los valores por defecto (vacíos)
    this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

  // Cuando en el componente de <app-listado-peliculas> se borra una película, "envía una alerta"
  // para indicar que vuelvan a cargarse los datos de las películas
  borrado() {
    this.cargarDatos();
  }
}
