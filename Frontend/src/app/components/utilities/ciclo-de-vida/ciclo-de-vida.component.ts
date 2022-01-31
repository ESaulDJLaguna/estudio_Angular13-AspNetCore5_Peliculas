import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RatingComponent } from '../rating/rating.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css'],
})
export class CicloDeVidaComponent
  implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit
{
  @Input()
  titulo: string;
  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;
  timer: ReturnType<typeof setInterval>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    console.log(changes);
  }
  ngOnDestroy(): void {
    console.log('OnDestroy');
    clearInterval(this.timer);
  }
  ngDoCheck(): void {
    console.log('DoCheck');
  }
  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    //* No marcará error, ya que el componente ya está renderizado,
    //* así que ya puede hacer referencia al componente <app-rating>
    this.ratingComponent.ratingSeleccionado = 3;
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log('OnInit');
    //! ERROR, ngOnInit se ejecuta antes de que se renderice el componente
    // this.ratingComponent.ratingSeleccionado = 3;
    // setInterval devuelve un valor
    this.timer = setInterval(() => console.log(new Date()), 1000);
    console.log(`this.timer: ${this.timer}`);
    console.log(`typeof this.timer: ${typeof this.timer}`);
  }
}
