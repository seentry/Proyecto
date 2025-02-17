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

  public updateSearchTerm(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.trim();
  }

  public searchByButton(): void {
    if (!this.searchTerm) {
      this.filteredServicios = this.servicios;
      return;
    }

    let idBusqueda = Number(this.searchTerm);
    if (isNaN(idBusqueda)) {
      alert("Por favor ingrese un ID válido.");
      return;
    }

    let resultado = this.servicios.find(servicio => servicio.id === idBusqueda);
    this.filteredServicios = resultado ? [resultado] : [];
  }

  public updateSortOrder(event: Event): void {
    this.sortType = (event.target as HTMLSelectElement).value;
    this.sortServicios();
  }

  public sortServicios(): void {
    if (this.sortType === "id") {
      this.filteredServicios = [...this.servicios].sort((a, b) => a.id - b.id);
    } else if (this.sortType === "name") {
      this.filteredServicios = [...this.servicios].sort((a, b) =>
        a.cliente.nombre.localeCompare(b.cliente.nombre)
      );
    } else if (this.sortType === "dateSoon") {
      this.filteredServicios = [...this.servicios].sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    } else if (this.sortType === "dateLate") {
      this.filteredServicios = [...this.servicios].sort((a, b) => 
        new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
    } else if (this.sortType === "pay") {
      this.filteredServicios = [...this.servicios].sort((a, b) => 
        (b.pagado ? 1 : 0) - (a.pagado ? 1 : 0)
      );
    } else if (this.sortType === "noPay") {
      this.filteredServicios = [...this.servicios].sort((a, b) => 
        (a.pagado ? 1 : 0) - (b.pagado ? 1 : 0)
      );
    }
  }
}
