import { Component } from '@angular/core';  
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Servicio, Cita, Usuario } from '../../models/response.interface';
import { ReservaClienteComponent } from '../../components/reserva-cliente/reserva-cliente.component';
import { ReservaTrabajadorComponent } from '../../components/reserva-trabajador/reserva-trabajador.component';


@Component({
  selector: 'app-reserva',
  imports: [ReactiveFormsModule, ReservaClienteComponent, ReservaTrabajadorComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

  constructor(private service: RequestService) { }

  public loginUser = localStorage.getItem('userId');
  public rolUser = localStorage.getItem('userRol');
  

  //public userStartSesion: boolean = false;

  private apiUrlCita: string = 'http://localhost:8000/api/cita';
  private apiUrlUsuario: string = 'http://localhost:8000/api/usuario';
  public user: Usuario[] = [];

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUsuario).subscribe((response) => {
      this.user = response;
      console.log("Usuarios: ", response);
    }, (error) => {
      console.error("Error al obtener usuarios:", error);
    });
  }

  ngOnInit(): void {
    this.rolUser = localStorage.getItem('userRol');
    this.loginUser = localStorage.getItem('userId');
  
    console.log("Rol del usuario:", this.rolUser);
    console.log("ID del usuario:", this.loginUser);

  }
  

}


