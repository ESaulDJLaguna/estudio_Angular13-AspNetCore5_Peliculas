import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  tileLayer,
  latLng,
  LeafletMouseEvent,
  Marker,
  marker,
  icon,
} from 'leaflet';
import { ICoordenada } from 'src/app/models/Coordenada';

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
  @Output()
  coordenadaSeleccionada: EventEmitter<ICoordenada> = new EventEmitter<ICoordenada>();
  @Input()
  coordenadasIniciales: ICoordenada[] = [];

  constructor() {}

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) =>
      marker([valor.latitud, valor.longitud])
    );
  }

  manejarClick(event: LeafletMouseEvent) {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    // Obtiene latitud y longitud
    console.log({ latitud, longitud });

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
    this.coordenadaSeleccionada.emit({ latitud: latitud, longitud: longitud });
  }
}
