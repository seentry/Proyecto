import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { Cliente } from '../../models/response.interfaceClientes';
import { Cita } from '../../models/response.interfaceCita';


@Component({
  selector: 'app-mi-perfil',
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent implements OnInit {
  public userProfile: Cliente | null = null;
  public userAppointments: Cita[] = [];

  constructor(private service: RequestService) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.getUserAppointments();
  }

  public getUserProfile(): void {
    this.service.getProfile().subscribe((response: Cliente) => {
      console.log("Perfil recibido:", response);
      this.userProfile = response;
    }, (error) => {
      console.error("Error al obtener perfil:", error);
    });
  }

  public getUserAppointments(): void {
    this.service.getAppointments().subscribe((response: Cita[]) => {
      console.log("Citas recibidas:", response);
      this.userAppointments = response;
    }, (error) => {
      console.error("Error al obtener citas:", error);
    });
  }

  public cancelAppointment(id: number): void {
    if (confirm("¿Estás seguro de que quieres cancelar esta cita?")) {
      this.service.cancelAppointment(id).subscribe(() => {
        this.userAppointments = this.userAppointments.filter(app => app.id !== id);
        alert("Cita cancelada exitosamente");
      }, (error) => {
        console.error("Error al cancelar la cita:", error);
      });
    }
  }
}
