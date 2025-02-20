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

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = [];

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';

  public servicio: string = "";
  public stock: number = 0;
  public precio: string = "";




  public servicios_productos: string = "servicios";

  public array_servicos: Servicio[] = [];
  public array_productos: Servicio[] = [];

  public click_servicios(){
    this.servicios_productos = "servicios"
    console.log("servicios");
  }

  public click_productos(){
    this.servicios_productos = "productos"
    console.log("productos");
  }


  /*public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Respuesta de la API:", response); // Verifica lo que llega de la API
        this.servicios = response;

        for (let index = 0; index < this.servicios.length; index++) {
          if (this.servicios[index].stock == null) {
            this.array_servicos.push(this.servicios[index]);
          } else {
            this.array_productos.push(this.servicios[index]);
          }
        }
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }*/

    ngOnInit(): void {
      this.getServicios();
      console.log(this.array_servicos)
      console.log("------------------------------------")
      console.log(this.array_productos)
    }

    private getServicios(): void {
      this.service.getServicios(this.apiUrlServicio).subscribe(
        (response) => {
          console.log("Servicios recibidos:", response);
          this.servicios = response;

          for (let index = 0; index < this.servicios.length; index++) {
            if (this.servicios[index].stock == null) {
              this.array_servicos.push(this.servicios[index]);
            } else {
              this.array_productos.push(this.servicios[index]);
            }
          }
        },
        (error) => {
          console.error("Error al obtener servicios:", error);
        }
      );
    }


    //Carrusel<------------------------------------------>




}
