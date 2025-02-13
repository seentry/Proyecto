import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../../models/response.interfaceCita';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  imports: [ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {
  public servicios: any[] = [];

  constructor(private service: RequestService) { }

  private apiUrl: string = 'http://localhost:8000/cita';

  ngOnInit(): void {
    this.getServicios();
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrl).subscribe((response) => {
      console.log(response);
      this.servicios = response;
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }

  reactiveForm = new FormGroup({
    tipoReserva: new FormControl(''),   
    opcionAdicional: new FormControl(''), 
    fechaHora: new FormControl(''),      
    comentario: new FormControl('')      
  });

  public onSubmit(): void {
    this.crearCita();
    /*
    console.log('Formulario enviado:', this.reactiveForm.value);
    console.log('Tipo de reserva:', this.reactiveForm.value.tipoReserva);
    console.log('Opción adicional:', this.reactiveForm.value.opcionAdicional);
    console.log('Fecha y Hora:', this.reactiveForm.value.fechaHora);
    console.log('Comentario:', this.reactiveForm.value.comentario);
    */
  }

  public crearCita(): void {
    const nuevaCita: Cita = {
      fecha: '2024-02-15T10:30:00',
      precio: 50,
      pagado: false,
      cliente: 1, 
      trabajador: 1 
    };
  
    this.service.postCita(this.apiUrl, nuevaCita).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    );
  }

}

  /*
  public crearCita(): void {
    const nuevaCita: any = {
      fecha: '2024-02-15T10:30:00',
      precio: 50,
      cliente: 1, // ✅ Cliente es obligatorio
    };
  
    // Solo incluir trabajador si tiene un valor definido
    const trabajadorId = 1; // O el valor real del trabajador
    if (trabajadorId) {
      nuevaCita.trabajador = trabajadorId;
    }
  
    this.service.postCita(this.apiUrl, nuevaCita).subscribe(
      (response) => {
        console.log('Cita creada con éxito:', response);
      },
      (error) => {
        console.error('Error al crear cita:', error);
      }
    );
  }
  */