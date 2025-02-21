import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Usuario} from '../../models/response.interface';
import {RequestService} from '../../services/request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrarse',
  imports: [ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {

  public apiUrlUsuario: string = 'http://52.205.151.118/api/usuario';
  public dataUserClient: Usuario[] = [];
  reactiveForm = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    contraseña: new FormControl(''),
  });

  constructor(private service: RequestService, private router: Router) {
  }

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

  public onSubmit(): void {
    if (this.reactiveForm.valid) {
      this.createUsuario();
    } else {
      console.log("Por favor, completa todos los campos correctamente.");
    }
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

    this.service.createUsuario(this.apiUrlUsuario, newUser).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    )

    this.router.navigate(["/inicio_sesion"]);
  }
}
