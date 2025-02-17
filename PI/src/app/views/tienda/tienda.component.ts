import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Servicio } from '../../models/response.interface';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  imports: [CardComponent]
})
export class TiendaComponent {

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = []; 
  public serviciosPaginados: Servicio[] = []; 
  public currentPage: number = 1;  // Página actual
  public itemsPerPage: number = 4; // Elementos por página
  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';

  ngOnInit(): void {  
    this.getServicios();
  }

  private getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Servicios recibidos:", response);
        this.servicios = response.filter(servicio => servicio.imagen !== null && servicio.imagen !== ''); // Filtrar imágenes vacías
        this.actualizarPaginacion(); 
      },
      (error) => {
        console.error("Error al obtener servicios:", error);
      }
    );
  }

  // Método para actualizar los datos paginados
  private actualizarPaginacion(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.serviciosPaginados = this.servicios.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.actualizarPaginacion();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPaginacion();
    }
  }

  totalPages(): number {
    return Math.ceil(this.servicios.length / this.itemsPerPage);
  }
}
