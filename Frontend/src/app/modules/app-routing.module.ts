import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearActorComponent } from '../components/actores/crear-actor/crear-actor.component';
import { EditarActorComponent } from '../components/actores/editar-actor/editar-actor.component';
import { IndiceActoresComponent } from '../components/actores/indice-actores/indice-actores.component';
import { CrearCineComponent } from '../components/cines/crear-cine/crear-cine.component';
import { EditarCineComponent } from '../components/cines/editar-cine/editar-cine.component';
import { IndiceCinesComponent } from '../components/cines/indice-cines/indice-cines.component';
import { CrearGeneroComponent } from '../components/generos/crear-genero/crear-genero.component';
import { EditarGeneroComponent } from '../components/generos/editar-genero/editar-genero.component';
import { IndiceGenerosComponent } from '../components/generos/indice-generos/indice-generos.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/seguridad/login/login.component';
import { CrearPeliculaComponent } from '../components/peliculas/crear-pelicula/crear-pelicula.component';
import { DetallePeliculaComponent } from '../components/peliculas/detalle-pelicula/detalle-pelicula.component';
import { EditarPeliculaComponent } from '../components/peliculas/editar-pelicula/editar-pelicula.component';
import { FiltroPeliculasComponent } from '../components/peliculas/filtro-peliculas/filtro-peliculas.component';
import { EsAdminGuard } from '../guards/es-admin.guard';
import { RegistroComponent } from '../components/seguridad/registro/registro.component';
import { IndiceUsuariosComponent } from '../components/seguridad/indice-usuarios/indice-usuarios.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'generos',
    component: IndiceGenerosComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'generos/crear',
    component: CrearGeneroComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'generos/editar/:id',
    component: EditarGeneroComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'actores',
    component: IndiceActoresComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'actores/crear',
    component: CrearActorComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'actores/editar/:id',
    component: EditarActorComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'cines',
    component: IndiceCinesComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'cines/crear',
    component: CrearCineComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'cines/editar/:id',
    component: EditarCineComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'peliculas/crear',
    component: CrearPeliculaComponent,
    canActivate: [EsAdminGuard],
  },
  {
    path: 'peliculas/editar/:id',
    component: EditarPeliculaComponent,
    canActivate: [EsAdminGuard],
  },
  { path: 'peliculas/buscar', component: FiltroPeliculasComponent },
  { path: 'pelicula/:id', component: DetallePeliculaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  {
    path: 'usuarios',
    component: IndiceUsuariosComponent,
    canActivate: [EsAdminGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
