import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css'],
})
export class CrearGeneroComponent implements OnInit {
  constructor(private router: Router, private formBuilder: FormBuilder) {}
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: '',
    });
  }

  guardarCambios() {
    //TODO. GUARDAR LOS CAMBIOS
    this.router.navigate(['generos']);
  }
}
