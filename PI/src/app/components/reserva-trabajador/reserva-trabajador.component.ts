import {Component} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RequestService} from '../../services/request.service';
import {Cita, Usuario} from '../../models/response.interface';
import {Router} from '@angular/router';


@Component({
  selector: 'app-reserva-trabajador',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-trabajador.component.html',
  styleUrl: './reserva-trabajador.component.css'
})
export class ReservaTrabajadorComponent {

  public citas: Cita[] = [];
  public usuario: Usuario[] = [];

  public filteredServicios: any[] = [];

  public searchTerm: string = "";
  public sortType: string = "id";
  private apiUrl = 'http://52.205.151.118/api/cita';
  private apiUrlUser = 'http://52.205.151.118/api/usuario';

  constructor(private service: RequestService, private router: Router) {
  }

  ngOnInit(): void {
    this.getCitas();
    this.getUsuarios();
  }

  public getCitas(): void {
    this.service.getCitas(this.apiUrl).subscribe((response) => {
      console.log(response);
      this.citas = response;
      this.filteredServicios = response;
      this.addUserData();
    }, (error) => {
      console.error("Error al obtener citas:", error);
    });
  }

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUser).subscribe((response) => {
      console.log(response);
      this.usuario = response;
    }, (error) => {
      console.error("Error al obtener user:", error);
    });
  }

  //FILTROS
  public updateSearchTerm(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.trim();
  }

  public searchByButton(): void {
    if (!this.searchTerm.trim()) {
      this.filteredServicios = this.citas;
      this.addUserData();
      return;
    }
  
    const searchTermLower = this.searchTerm.toLowerCase();
  
    this.filteredServicios = this.citas.filter(cita =>
      cita.cliente.nombre.toLowerCase().includes(searchTermLower)
    );
  
    this.addUserData();
  }
  


  public updateSortOrder(event: Event): void {
    this.sortType = (event.target as HTMLSelectElement).value;
    this.sortServicios();
    this.addUserData();
  }

  public addUserData(): void {
    this.filteredServicios.forEach((cita) => {
      let cliente = this.usuario.find(user => user.id === cita.cliente.id);
      let trabajador = this.usuario.find(user => user.id === cita.trabajador.id);

      if (cliente) {
        cita.cliente.nombre = `${cliente.nombre} ${cliente.apellidos}`;
      } else {
        cita.clienteNombre = 'Desconocido';
      }

      if (trabajador) {
        cita.trabajador.nombre = `${trabajador.nombre} ${trabajador.apellidos}`;
      } else {
        cita.trabajador.nombre = 'Desconocido';
      }
    });
  }


  public sortServicios(): void {
    if (this.sortType === "id") {
      this.filteredServicios = [...this.citas].sort((a, b) => a.id! - b.id!);
    } else if (this.sortType === "name") {
      this.filteredServicios = [...this.citas].sort((a, b) =>
        a.cliente.nombre.localeCompare(b.cliente.nombre)
      );
    } else if (this.sortType === "dateSoon") {
      this.filteredServicios = [...this.citas].sort((a, b) =>
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    } else if (this.sortType === "dateLate") {
      this.filteredServicios = [...this.citas].sort((a, b) =>
        new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
      );
    } else if (this.sortType === "pay") {
      this.filteredServicios = [...this.citas].sort((a, b) =>
        (b.pagado ? 1 : 0) - (a.pagado ? 1 : 0)
      );
    } else if (this.sortType === "noPay") {
      this.filteredServicios = [...this.citas].sort((a, b) =>
        (a.pagado ? 1 : 0) - (b.pagado ? 1 : 0)
      );
    }
  }

  //ELIMINAR
  public eliminarCita(id: number): void {
    if (!confirm("¿Estás seguro de que deseas eliminar esta cita?")) {
      return;
    }

    const apiUrlDelete = `http://52.205.151.118/api/cita/${id}`;

    this.service.deleteCita(apiUrlDelete).subscribe(
      () => {
        this.citas = this.citas.filter(cita => cita.id !== id);
        this.filteredServicios = this.filteredServicios.filter(cita => cita.id !== id);
        alert("Cita eliminada con éxito.");
      },
      (error) => {
        console.error("Cita eliminada con exito");
        alert("Cita eliminada con éxito.");

      }
    );
  }

  //EDITAR
  public citaEditando: Cita | null = null;

  public citaForm = new FormGroup({
    fecha: new FormControl<string | null>(''),
    precio: new FormControl<number | null>(null),
    pagado: new FormControl<string | null>('')
  });
  

  public editarCita(id: number): void {
    this.citaEditando = this.citas.find(cita => cita.id === id) || null;
    
    if (!this.citaEditando) {
      console.error("Cita no encontrada");
      return;
    }
  
    this.citaForm.setValue({
      fecha: this.citaEditando.fecha || '',
      precio: this.citaEditando.precio ?? 0,
      pagado: this.citaEditando.pagado ? 'true' : 'false'
    });
  }
  

  public guardarEdicion(): void {
    if (!this.citaEditando) return;
  
    if (!confirm("¿Estás seguro de que deseas guardar los cambios en esta cita?")) {
      return;
    }
  
    const apiUrlUpdate = `http://52.205.151.118/api/cita/${this.citaEditando!.id}`;
  
    const citaActualizada: Cita = {
      ...this.citaEditando!,
      fecha: this.citaForm.value.fecha ?? this.citaEditando?.fecha ?? '',
      precio: this.citaForm.value.precio ?? this.citaEditando?.precio ?? 0,
      pagado: this.citaForm.value.pagado === 'true'
    };    
  
    this.service.updateCita(apiUrlUpdate, citaActualizada).subscribe(
      (response) => {
        alert("Cita actualizada con éxito.");
      },
      (error) => {
        console.error("Error al actualizar la cita:", error);
        alert("Hubo un error al actualizar la cita. Inténtalo de nuevo.");
      }
    );
  }
  

  public cancelarEdicion(): void {
    this.citaEditando = null;
    this.citaForm.reset();
  }
}
