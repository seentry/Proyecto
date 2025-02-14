import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Servicio, Cita, Usuario } from '../../models/response.interface';

@Component({
  selector: 'app-reserva',
  imports: [ReactiveFormsModule],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

  constructor(private service: RequestService) { }

  public servicios: Servicio[] = [];
  private apiUrl: string = 'http://localhost:8000/api/cita';

  private apiUsuarioUrl: string = 'http://localhost:8000/api/usuario'; 
  public trabajadores: Usuario[] = [];

  public options: string[][] = [
    ['Limpieza facial', 'Hidratación facial', 'Tratamiento antiarrugas'], 
    ['Masaje reductivo', 'Exfoliación corporal', 'Drenaje linfático'],    
    ['Depilación láser', 'Tratamiento de manchas', 'Rejuvenecimiento con luz pulsada'], 
    ['Manicure spa', 'Uñas acrílicas', 'Diseño personalizado']           
  ];

  public specificOptions: string[] = [];
  public price: number = 0;
  public worker: Usuario | null = null;
  public currentUser: Usuario | null = null;  

  ngOnInit(): void {
    this.getServicios();
    this.getUsuarios();
  }

  public actualizarOpciones(): void {
    const tipo = this.reactiveForm.value.tipoReserva;
  
    if (tipo === 'facial') {
      this.specificOptions = this.options[0]; 
    } else if (tipo === 'corporal') {
      this.specificOptions = this.options[1]; 
    } else if (tipo === 'laser') {
      this.specificOptions = this.options[2]; 
    } else if (tipo === 'uñas') {
      this.specificOptions = this.options[3];
    } else {
      this.specificOptions = []; 
    }
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrl).subscribe((response) => {
      this.servicios = response;
      console.log(response);
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUsuarioUrl).subscribe((response) => {
      this.trabajadores = response.filter(user => user.rol === "ROL_TRABAJADOR");
      this.currentUser = response.find(user => user.rol === "ROL_CLIENTE") || null;
      console.log(response);
      this.selectWorker();
    }, (error) => {
      console.error("Error al obtener usuarios:", error);
    });
  }

  reactiveForm = new FormGroup({
    tipoReserva: new FormControl(''),   
    opcionAdicional: new FormControl(''), 
    fechaHora: new FormControl(''),      
    comentario: new FormControl(''), 
    pagoEfectivo: new FormControl('')     
  });

  public onSubmit(): void {
    this.crearCita();
  }

  public generatePrice(): void {
    let service = this.reactiveForm.value.opcionAdicional;
  
    switch (service) {
      case 'Limpieza facial':
        this.price = 30;
        break;
      case 'Hidratación facial':
        this.price = 35;
        break;
      case 'Tratamiento antiarrugas':
        this.price = 50;
        break;
      case 'Masaje reductivo':
        this.price = 40;
        break;
      case 'Exfoliación corporal':
        this.price = 45;
        break;
      case 'Drenaje linfático':
        this.price = 50;
        break;
      case 'Depilación láser':
        this.price = 60;
        break;
      case 'Tratamiento de manchas':
        this.price = 55;
        break;
      case 'Rejuvenecimiento con luz pulsada':
        this.price = 70;
        break;
      case 'Manicure spa':
        this.price = 25;
        break;
      case 'Uñas acrílicas':
        this.price = 30;
        break;
      case 'Diseño personalizado':
        this.price = 35;
        break;
      default:
        this.price = 0; 
        break;
    }
  }

  public selectWorker(): void {
    if (this.trabajadores.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.trabajadores.length);
      this.worker = this.trabajadores[randomIndex]; 
    }
  }
  
  public crearCita(): void {
    const nuevaCita: Cita = {
      fecha: this.reactiveForm.value.fechaHora ?? "", // Asegura que sea un string
      precio: this.price,
      pagado: !!this.reactiveForm.value.pagoEfectivo,
      cliente: this.currentUser?.id ?? 0, 
      trabajador: this.worker?.id ?? 0
    };
    
  
    console.log("Datos enviados");  
  
    this.service.postCita(this.apiUrl, nuevaCita).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    );
  }
  
  
  
  
  

}
