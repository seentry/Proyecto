import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { RequestService } from '../../services/request.service';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { Servicio } from '../../models/response.interface';
import { CardGestionProductosComponent } from '../../components/card-gestion-productos/card-gestion-productos.component';

@Component({
  selector: 'app-inicio',
  imports: [CardComponent, CarouselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {


  public servicios: Servicio[] = [];

  public servicio: string = "";
  public stock: number = 0;
  public precio: string = "";


  constructor(private service: RequestService) { }

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';

  public servicios_productos: string = "servicios";
  
  public array_servicos: Servicio[] = [];
  public array_productos: Servicio[] = [];

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
  
      for (let index = 0; index < this.servicios.length; index++) {
        if (this.servicios[index].stock == null) {  // Usamos this.servicios en lugar de response
          this.array_servicos.push(this.servicios[index]);
          //console.log("Servicio agregado a array_servicos:", this.array_servicos[this.array_servicos.length - 1]);
        } else {
          this.array_productos.push(this.servicios[index]);
          //console.log("Producto agregado a array_productos:", this.array_productos[this.array_productos.length - 1]);
        }
      }
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }
  

  ngOnInit(): void {
    this.getServicios();
  }

}
