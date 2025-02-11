import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';


@Component({
  selector: 'app-inicio',
  imports: [CardComponent, CarouselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
