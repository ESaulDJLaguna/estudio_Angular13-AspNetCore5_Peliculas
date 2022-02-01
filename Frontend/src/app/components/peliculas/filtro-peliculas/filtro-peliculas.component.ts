import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css'],
})
export class FiltroPeliculasComponent implements OnInit {
  form: FormGroup;
  generos = [
    { id: 1, nombre: 'Drama' },
    { id: 2, nombre: 'Acción' },
    { id: 3, nombre: 'Comedia' },
  ];
  peliculas = [
    {
      titulo: 'Spider-Man: Far From Home',
      enCines: false,
      proximosEstrenos: true,
      generos: [1, 2],
      poster: 'https://m.media-amazon.com/images/I/810OkkP0LnL._AC_SY679_.jpg',
    },
    {
      titulo: 'Moana',
      enCines: true,
      proximosEstrenos: false,
      generos: [3],
      poster: 'https://m.media-amazon.com/images/I/71t7-smAl3L._AC_SY679_.jpg',
    },
    {
      titulo: 'Frozen',
      enCines: false,
      proximosEstrenos: false,
      generos: [1, 3],
      poster: 'https://m.media-amazon.com/images/I/714arK1ZtCL._AC_SY741_.jpg',
    },
  ];
  peliculasOriginal = this.peliculas;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false,
    });
    // valores representa los valores que tiene actualmente el formulario
    this.form.valueChanges.subscribe((valores) => {
      /* console.log(
        'this.form.valueChanges.subscribe((valores)) => log(valores)'
      );
      console.log(valores); */
      // Nos muestra de nuevo todas las películas si se borra en el input de Título
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
    });
  }

  buscarPeliculas(valores: any) {
    // El campo título del formulario no está vacío
    if (valores.titulo) {
      // Filtramos por título
      this.peliculas = this.peliculas.filter(
        // Si lo que sea que el usuario haya escrito (valores.titulo) se encuentra
        // en el título de una película (pelicula.titulo) del listado de películas
        // queremos mostrar este elemento en películas
        (pelicula) => pelicula.titulo.indexOf(valores.titulo) !== -1
      );
      /* console.log('buscarPeliculas():');
      console.log(this.peliculas); */
    }

    if (valores.generoId !== 0) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.generos.indexOf(valores.generoId) !== -1
      );
    }
    if (valores.proximosEstrenos) {
      this.peliculas = this.peliculas.filter(
        (pelicula) => pelicula.proximosEstrenos
      );
    }

    if (valores.enCines) {
      this.peliculas = this.peliculas.filter((pelicula) => pelicula.enCines);
    }
  }

  limpiar() {}
}
