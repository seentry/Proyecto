import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { RequestService } from '../../services/request.service';
import { Servicio, Usuario } from '../../models/response.interface';
import { ProductoClienteComponent } from '../../components/producto-cliente/producto-cliente.component';
import { ProductoTrabajadorComponent } from '../../components/producto-trabajador/producto-trabajador.component';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
  imports: [CardComponent, ProductoClienteComponent, ProductoTrabajadorComponent]
})
export class TiendaComponent {

 constructor(private service: RequestService) { }
 
   public loginUser = localStorage.getItem('userId');
   public rolUser = localStorage.getItem('userRol');
   
 
   //public userStartSesion: boolean = false;
 
   private apiUrlCita: string = 'http://52.205.151.118/api/cita';
   private apiUrlUsuario: string = 'http://52.205.151.118/api/usuario';
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
