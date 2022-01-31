import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
