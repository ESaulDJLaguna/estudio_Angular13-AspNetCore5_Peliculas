import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { ListadoGenericoComponent } from './components/utilities/listado-generico/listado-generico.component';
import { ListadoPeliculasComponent } from './components/peliculas/listado-peliculas/listado-peliculas.component';
import { MenuComponent } from './components/shared/menu/menu.component';

import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material.module';
import { RatingComponent } from './components/utilities/rating/rating.component';
import { CicloDeVidaComponent } from './components/utilities/ciclo-de-vida/ciclo-de-vida.component';
import { IndiceGenerosComponent } from './components/generos/indice-generos/indice-generos.component';
import { HomeComponent } from './components/home/home.component';
import { CrearGeneroComponent } from './components/generos/crear-genero/crear-genero.component';
import { IndiceActoresComponent } from './components/actores/indice-actores/indice-actores.component';
import { CrearActorComponent } from './components/actores/crear-actor/crear-actor.component';
import { CrearPeliculaComponent } from './components/peliculas/crear-pelicula/crear-pelicula.component';
import { CrearCineComponent } from './components/cines/crear-cine/crear-cine.component';
import { IndiceCinesComponent } from './components/cines/indice-cines/indice-cines.component';
import { EditarActorComponent } from './components/actores/editar-actor/editar-actor.component';
import { EditarGeneroComponent } from './components/generos/editar-genero/editar-genero.component';
import { EditarCineComponent } from './components/cines/editar-cine/editar-cine.component';
import { EditarPeliculaComponent } from './components/peliculas/editar-pelicula/editar-pelicula.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioGeneroComponent } from './components/generos/formulario-genero/formulario-genero.component';
import { FiltroPeliculasComponent } from './components/peliculas/filtro-peliculas/filtro-peliculas.component';
import { FormularioActoresComponent } from './components/actores/formulario-actores/formulario-actores.component';
import { InputImgComponent } from './components/utilities/input-img/input-img.component';
import { InputMarkdownComponent } from './components/utilities/input-markdown/input-markdown.component';
import { FormularioCineComponent } from './components/cines/formulario-cine/formulario-cine.component';
import { MapaComponent } from './components/utilities/mapa/mapa.component';
import { FormularioPeliculaComponent } from './components/peliculas/formulario-pelicula/formulario-pelicula.component';
import { SelectorMultipleComponent } from './components/utilities/selector-multiple/selector-multiple.component';
import { AutocompleteActoresComponent } from './components/actores/autocomplete-actores/autocomplete-actores.component';
import { HttpClientModule } from '@angular/common/http';
import { MostrarErroresComponent } from './components/utilities/mostrar-errores/mostrar-errores.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DetallePeliculaComponent } from './components/peliculas/detalle-pelicula/detalle-pelicula.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoPeliculasComponent,
    ListadoGenericoComponent,
    MenuComponent,
    RatingComponent,
    CicloDeVidaComponent,
    IndiceGenerosComponent,
    HomeComponent,
    CrearGeneroComponent,
    IndiceActoresComponent,
    CrearActorComponent,
    CrearPeliculaComponent,
    CrearCineComponent,
    IndiceCinesComponent,
    EditarActorComponent,
    EditarGeneroComponent,
    EditarCineComponent,
    EditarPeliculaComponent,
    FormularioGeneroComponent,
    FiltroPeliculasComponent,
    FormularioActoresComponent,
    InputImgComponent,
    InputMarkdownComponent,
    FormularioCineComponent,
    MapaComponent,
    FormularioPeliculaComponent,
    SelectorMultipleComponent,
    AutocompleteActoresComponent,
    MostrarErroresComponent,
    DetallePeliculaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    LeafletModule,
    FormsModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
