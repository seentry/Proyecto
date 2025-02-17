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

  public servicios_productos: string = "servicios";


  public click_servicios(){
    console.log("servicios");
  }

  public click_productos(){
    this.servicios_productos = "productos"
    console.log("productos");
  }

}
