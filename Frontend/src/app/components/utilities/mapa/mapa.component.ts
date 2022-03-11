import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  tileLayer,
  latLng,
  LeafletMouseEvent,
  Marker,
  marker,
  icon,
} from 'leaflet';
import { ICoordenada, ICoordenadaConMensaje } from 'src/app/models/Coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
})
export class MapaComponent implements OnInit {
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 15,
    center: latLng(19.531408755687504, -99.02658820152284),
  };
  capas: Marker<any>[] = [];
  @Output() coordenadaSeleccionada: EventEmitter<ICoordenada> =
    new EventEmitter<ICoordenada>();
  @Input() coordenadasIniciales: ICoordenadaConMensaje[] = [];
  @Input() soloLectura: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      let marcador = marker([valor.latitud, valor.longitud]);
      // Si hay un mensaje presente
      if (valor.mensaje) {
        // Le pasamos el mensaje y unas opciones
        marcador.bindPopup(valor.mensaje, { autoClose: false, autoPan: false });
      }
      return marcador;
    });
  }

  manejarClick(event: LeafletMouseEvent) {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    // Obtiene latitud y longitud
    // console.log({ latitud, longitud });

    if (!this.soloLectura) {
      this.capas = [];
      this.capas.push(
        marker([latitud, longitud], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'marker-icon.png',
            iconRetinaUrl: 'marker-icon-2x.png',
            shadowUrl: 'assets/images/marker-shadow.png',
          }),
        })
      );
      this.coordenadaSeleccionada.emit({
        latitud: latitud,
        longitud: longitud,
      });
    }
  }
}
