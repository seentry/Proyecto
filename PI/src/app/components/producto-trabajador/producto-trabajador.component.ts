import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Servicio } from '../../models/response.interface';
import { CardProductoComponent } from '../card-producto/card-producto.component';

@Component({
  selector: 'app-producto-trabajador',
  imports: [CardProductoComponent],
  templateUrl: './producto-trabajador.component.html',
  styleUrl: './producto-trabajador.component.css'
})
export class ProductoTrabajadorComponent {

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = []; 
  public serviciosPaginados: Servicio[] = []; 
  public currentPage: number = 1;  // Página actual
  public itemsPerPage: number = 6; // Elementos por página
  public apiUrlServicio: string = 'http://52.205.151.118/api/servicio';

  public ngOnInit(): void {  
    this.getServicios();
  }

  public getServicios(): void {
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
  public actualizarPaginacion(): void {
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
