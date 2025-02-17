import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { RequestService } from '../../services/request.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { Servicio } from '../../models/response.interface';


@Component({
  selector: 'app-inicio',
  imports: [CardComponent, CarouselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


  public servicios: Servicio[] = [];
  constructor(private service: RequestService) { }

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';

  public servicios_productos: string = "servicios";
  
  public click_servicios(){
    console.log("servicios");
  }

  public click_productos(){
    this.servicios_productos = "productos"
    console.log("productos");
  }


  public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe((response) => {
      this.servicios = response;
      console.log("Servicio: ", response);
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }

  ngOnInit(): void {
    this.getServicios();
  }

}
