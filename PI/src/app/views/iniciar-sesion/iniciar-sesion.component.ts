import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-iniciar-sesion',
  imports: [ReactiveFormsModule],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  reactiveForm = new FormGroup({
    email: new FormControl(''),
    contraseña: new FormControl(''),
    });

    public onSubmit(): void {
      console.log('form: ', this.reactiveForm);
      console.log('form: ', this.reactiveForm.value);
      console.log('form: ', this.reactiveForm.value.email);
  }
}
