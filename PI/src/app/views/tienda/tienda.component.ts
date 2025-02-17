import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Servicio } from '../../models/response.interface';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  imports: [CardComponent]
})
export class TiendaComponent implements OnInit {

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = [];

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';

  ngOnInit(): void {
    this.getServicios();
  }

  private getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Servicios recibidos:", response);
        this.servicios = response.filter(servicio => servicio.imagen !== null && servicio.imagen !== ''); //Filtra las imagenes que sean null, las elimina del array 
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }
}
