import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../models/response.interface';
import { RequestService } from '../../services/request.service';


@Component({
  selector: 'app-iniciar-sesion',
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  constructor(private service: RequestService) { }

  public checkSession(idUser: number): void {
    localStorage.setItem('userId', idUser.toString()); 
    console.log("Sesion iniciado con el usuario con id: ", idUser);
  }
  
  //let userId = localStorage.getItem('userId'); //con esto se puede acceder al local storege


  private startSesion(): void {
    for (let i = 0; i < this.dataUserClient.length; i++) {
      if (this.dataUserClient[i].rol === "ROL_CLIENTE") {
        if (this.dataUserClient[i].email === this.reactiveForm.value.email && this.dataUserClient[i].contrasena === this.reactiveForm.value.contraseña) {
          let idUser = this.dataUserClient[i].id;
          if (idUser !== undefined) { 
            this.checkSession(idUser);
          } else {
            console.error("Error: El usuario encontrado no tiene ID");
          }        }
      }
    }
  }

  public apiUrlUsuario: string = 'http://localhost:8000/api/usuario';
  public dataUserClient: Usuario[] = [];

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUsuario).subscribe((response) => {
      this.dataUserClient = response;
      console.log("Usuarios: ", response);
    }, (error) => {
      console.error("Error al obtener usuarios:", error);
    });
  }

  public ngOnInit(): void {
    this.getUsuarios();
  }

  reactiveForm = new FormGroup({
    email: new FormControl(''),
    contraseña: new FormControl(''),
  });

  public onSubmit(): void {
    this.startSesion();
  }
}
