import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Usuario } from '../../models/response.interface';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-registrarse',
  imports: [ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  constructor(private service: RequestService) { }

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
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    contraseña: new FormControl(''),
    });

  public onSubmit(): void {
    this.createUsuario();
  }

  public createUsuario(): void {
    const newUser: Usuario = {
      nombre: this.reactiveForm.value.nombre ?? '',
      apellidos: this.reactiveForm.value.apellidos ?? '',
      email: this.reactiveForm.value.email ?? '',
      dni: this.reactiveForm.value.dni ?? '',
      rol: "ROL_CLIENTE",
      contrasena: this.reactiveForm.value.contraseña ?? undefined, 
    };
    
    this.service.createUsuario(this.apiUrlUsuario, newUser).subscribe (
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    )
  }
}
