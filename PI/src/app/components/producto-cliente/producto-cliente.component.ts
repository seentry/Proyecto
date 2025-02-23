import {Component} from '@angular/core';
import {CardComponent} from '../card/card.component';
import {RequestService} from '../../services/request.service';
import {Servicio} from '../../models/response.interface';

@Component({
  selector: 'app-producto-cliente',
  imports: [CardComponent],
  templateUrl: './producto-cliente.component.html',
  styleUrl: './producto-cliente.component.css'
})
export class ProductoClienteComponent {

  public servicios: Servicio[] = [];
  public serviciosPaginados: Servicio[] = [];
  public currentPage: number = 1;  // Página actual
  public itemsPerPage: number = 6; // Elementos por página
  public apiUrlServicio: string = 'http://52.205.151.118/api/servicio';

  constructor(private service: RequestService) {
  }

  public ngOnInit(): void {
    this.getServicios();
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Servicios recibidos:", response);
        this.servicios = response.filter(servicio => servicio.stock !== null);
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
