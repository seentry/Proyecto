import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registrarse',
  imports: [ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.css'
})
export class RegistrarseComponent {
  reactiveForm = new FormGroup({
    nombre: new FormControl(''),
    apellidos: new FormControl(''),
    email: new FormControl(''),
    dni: new FormControl(''),
    contraseña: new FormControl(''),
    });

    public onSubmit(): void {
      console.log('form: ', this.reactiveForm);
      console.log('form: ', this.reactiveForm.value);
      console.log('form: ', this.reactiveForm.value.nombre);
  }
}
