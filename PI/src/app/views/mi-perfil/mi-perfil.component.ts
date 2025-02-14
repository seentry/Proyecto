import { Component } from '@angular/core';

@Component({
  selector: 'app-mi-perfil',
  imports: [],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {

  public userProfile = {
    name: "Juan Pérez",
    surname: "Pére",
    email: "juan.perez@example.com",
    dni: "Calle Falsa 123, Ciudad",
    birthDate: "1990-05-20",
    photoUrl: "assets/user-profile.jpg"
  };

  public userAppointments = [
    { id: 1, date: "2024-03-10", time: "10:00 AM", service: "Corte de Pelo", status: "Confirmada" },
    { id: 2, date: "2024-03-15", time: "02:00 PM", service: "Masaje Relajante", status: "Pendiente" },
    { id: 3, date: "2024-03-20", time: "04:30 PM", service: "Limpieza Facial", status: "Confirmada" }
  ];

  constructor() {}

  ngOnInit(): void {}

  editProfile(): void {
    alert("Funcionalidad para editar perfil aún no implementada.");
  }

  cancelAppointment(appointmentId: number): void {
    if (confirm("¿Estás seguro de cancelar esta cita?")) {
      this.userAppointments = this.userAppointments.filter(appointment => appointment.id !== appointmentId);
    }
  }
}
