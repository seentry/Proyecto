import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario, LoginRequest, LoginResponse } from '../../models/response.interface';
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

  public apiSesion: string = 'http://52.205.151.118/auth/login';


  public apiUrlUsuario: string = 'http://52.205.151.118/api/usuario';
  public dataUser: Usuario[] = [];

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
    email: new FormControl('', [Validators.required]),
    contraseña: new FormControl('', [Validators.required])
  });

  public checkSession(idUser: number, rol: string): void {
    localStorage.setItem('userId', idUser.toString());
    localStorage.setItem('userRol', rol);
    console.log("Sesión iniciada con el usuario ID:", idUser);
    console.log("Rol:", rol);
  }

  private startSesion(): void {
    const takeData = {
      email: this.reactiveForm.value.email ?? '',
      contrasena: this.reactiveForm.value.contraseña ?? '' 
    };
  
    this.service.login(this.apiSesion, takeData).subscribe(
      (response: LoginResponse) => {
        console.log("Inicio de sesión exitoso:", response);
        this.checkSession(response.id, response.rol);
        this.router.navigate(["/inicio"]);
      },
      (error) => {
        console.error("Error al iniciar sesión:", error);
        alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
      }
    );
  }
  
  public onSubmit(): void {
    this.startSesion();
  }
}