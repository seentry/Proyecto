import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Usuario, LoginRequest } from '../../models/response.interface';
import { RequestService } from '../../services/request.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-iniciar-sesion',
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {

  constructor(private service: RequestService, private router: Router) { }

  public checkSession(idUser: number, rol: string): void {
    localStorage.setItem('userId', idUser.toString());
    localStorage.setItem('userRol', rol.toString());
    console.log("Sesion iniciado con el usuario con id: ", idUser);
    console.log("Rol: ", rol);

  }

  //Modificado para que permita el inicio de sesion de todos los tipos de usuario
  private startSesion(): void {
    for (let i = 0; i < this.dataUser.length; i++) {
      if (this.dataUser[i].email === this.reactiveForm.value.email && this.dataUser[i].contrasena === this.reactiveForm.value.contraseña) {
        let idUser = this.dataUser[i].id;
        let rol = this.dataUser[i].rol;
        if (idUser !== undefined) {
          this.checkSession(idUser, rol);
          this.router.navigate(["/inicio"]);
        } else {
          console.error("Error: El usuario encontrado no tiene ID");
        }
      }

    }
  }

  public apiUrlUsuario: string = 'http://localhost:8000/api/usuario';
  public dataUser: Usuario[] = [];
  public dataLogin: LoginRequest[] = [];

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUsuario).subscribe((response) => {
      this.dataUser = response;
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