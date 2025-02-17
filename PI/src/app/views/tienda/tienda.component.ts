import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Servicio } from '../../models/response.interface';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent {

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = [];

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';
  
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
