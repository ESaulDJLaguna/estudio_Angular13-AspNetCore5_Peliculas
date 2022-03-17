import { Component, OnInit } from '@angular/core';
import { SeguridadService } from 'src/app/services/seguridad.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(public seguridadService: SeguridadService) {}

  ngOnInit(): void {}
}
