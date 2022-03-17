import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ICoordenadaConMensaje } from 'src/app/models/Coordenada';
import { IPeliculaDTO } from 'src/app/models/Pelicula';
import { RatingService } from 'src/app/services/rating.service';
import Swal from 'sweetalert2';
import { PeliculasService } from '../../../services/peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],
})
export class DetallePeliculaComponent implements OnInit {
  pelicula: IPeliculaDTO;
  // Los siguientes campos los almacenaremos a parte para que nos
  // facilite trabajar con ellos
  fechaLanzamiento: Date;
  // Necesitamos transformar la URL del trailer a una URL Segura. Angular
  // nos estaría mostrando mensajes de advertencia si utilizamos una URL sin
  // pasarla por este mecanismo de seguridad
  trailerURL: SafeResourceUrl;
  coordenadas: ICoordenadaConMensaje[] = [];

  constructor(
    private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    // Es un sanitizador que nos va a asegurar que no haya nada
    // malicioso en nuestra URL
    private sanitizer: DomSanitizer,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.peliculasService.obtenerPorId(params.id).subscribe((pelicula) => {
        console.log(pelicula);

        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map((cine) => {
          return {
            longitud: cine.longitud,
            latitud: cine.latitud,
            mensaje: cine.nombre,
          };
        });
      });
    });
  }

  rated(puntuacion: number) {
    this.ratingService.rate(this.pelicula.id, puntuacion).subscribe(() => {
      Swal.fire('Exitoso', 'Su voto ha sido recibido', 'success');
    });
  }

  // Nos permitirá tomar el id de la URL del vídeo de YouTube
  // y colocarlo en el formato necesario para así mostrar
  // nuestro vídeo en pantalla
  generarURLYoutubeEmbed(url: any): SafeResourceUrl {
    if (!url) {
      return '';
    }

    // Extraemos el id del vídeo. El método split "divide" la cadena
    // en dos cadenas, una cadena representa lo que hay antes de v=
    // y la otra cadena lo que hay después. Las cadenas se guardan
    // en un arreglo y 'v=' "desaparece" de ambas
    let video_id = url.split('v=')[1];
    let posicionAmpersand = video_id.indexOf('&');
    // Si hay un & en la URL
    if (posicionAmpersand !== -1) {
      video_id = video_id.substring(0, posicionAmpersand);
    }

    // Le decimos que confíe en nuestra URL
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${video_id}`
    );
  }
}
