import {Component} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Servicio} from '../../models/response.interface';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CardProductoComponent} from '../card-producto/card-producto.component';

@Component({
  selector: 'app-producto-trabajador',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CardProductoComponent],
  templateUrl: './producto-trabajador.component.html',
  styleUrl: './producto-trabajador.component.css'
})
export class ProductoTrabajadorComponent {

  public servicios: Servicio[] = [];
  public serviciosPaginados: Servicio[] = [];
  public currentPage: number = 1;  // Página actual
  public itemsPerPage: number = 6; // Elementos por página
  public apiUrlServicio: string = 'http://52.205.151.118/api/servicio';
  public mostrarFormulario: boolean = false;
  public productoForm!: FormGroup;

  constructor(private service: RequestService, private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.getServicios();
    this.initForm();
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe(
      (response) => {
        console.log("Servicios recibidos:", response);
        this.servicios = response
        //this.servicios = response.filter(servicio => servicio.imagen !== null && servicio.imagen !== ''); // Filtrar imágenes vacías
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
    console.log(this.serviciosPaginados)
    console.log(startIndex)
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

  eliminarProducto(id: number) {
    if (id === undefined) return;

    const deleteUrl = `${this.apiUrlServicio}/${id}`;

    this.service.deleteProducto(deleteUrl).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(servicio => servicio.id !== id);
        this.actualizarPaginacion();
      },
      error: (err) => {
        console.error('Error eliminando el producto:', err);
        alert('Hubo un error al eliminar el producto.');
      }
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.productoForm.reset();
  }

  agregarProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }

    const nuevoProducto: Servicio = this.productoForm.value;

    if (this.productoForm.controls['servicio'].value === true){
      nuevoProducto.stock = null
    }

    this.service.postProducto(this.apiUrlServicio, nuevoProducto).subscribe({
      next: () => {
        this.getServicios();
        this.actualizarPaginacion();
        this.cerrarFormulario();
        this.changedServicio();
      },
      error: (err) => {
        console.error('Error al agregar el producto:', err);
        alert('Hubo un error al agregar el producto.');
      }
    });
  }

  private initForm(): void {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      servicio:[false],
      imagen: ['']
    });
  }

  changedServicio() {
    if (this.productoForm.controls['servicio'].value === true){
      this.productoForm.controls['stock'].disable();
      return;
    }

    if (this.productoForm.controls['servicio'].value === false){
      this.productoForm.controls['stock'].enable();
    }
  }
}
