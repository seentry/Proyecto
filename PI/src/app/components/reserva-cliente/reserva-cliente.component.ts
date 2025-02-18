import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Servicio, Cita, Usuario } from '../../models/response.interface';

@Component({
  selector: 'app-reserva-cliente',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './reserva-cliente.component.html',
  styleUrl: './reserva-cliente.component.css'
})

export class ReservaClienteComponent {

  constructor(private service: RequestService) { }

  public loginUser = localStorage.getItem('userId')

  public servicios: Servicio[] = [];
  private apiUrlCita: string = 'http://localhost:8000/api/cita';

  private apiUrlUsuario: string = 'http://localhost:8000/api/usuario';

  private apiUrlServicio: string = 'http://localhost:8000/api/servicio';
  private citas: Cita[] = [];

  public options: string[][] = [
    ['Limpieza facial', 'Hidratación facial', 'Tratamiento antiarrugas'],
    ['Masaje reductivo', 'Exfoliación corporal', 'Drenaje linfático'],
    ['Depilación láser', 'Tratamiento de manchas', 'Rejuvenecimiento con luz pulsada'],
    ['Manicure spa', 'Uñas acrílicas', 'Diseño personalizado']
  ];

  public hours: string[] = [
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];

  public citasOcupadas: { fecha: string; hora: string; trabajador: number }[] = [];

  public specificOptions: string[] = [];
  public price: number = 0;
  public allWorkers: Usuario[] = [];

  public ngOnInit(): void {
    this.getServicios();
    this.getUsuarios();
    this.getCitas();
  }

  public actualizarOpciones(): void {
    let tipo = this.reactiveForm.value.tipoReserva;

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
    this.service.getServicios(this.apiUrlServicio).subscribe((response) => {
      this.servicios = response;
      console.log("Servicio: ", response);
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }

  public getCitas(): void {
    this.service.getCitas(this.apiUrlCita).subscribe((response) => {
      this.citas = response;
      this.citasOcupadas = this.citas.map(({ fecha, trabajador }) => ({
        fecha: fecha.split('T')[0], //el split('T')[0] fuerza a que la fecha sea de tipo ISO 8601 para que sea comptible con la API, ademas la posicion 0 coge solo el campo de fecha
        hora: fecha.split('T')[1].slice(0, 5), //La posicion de 1 coge el campos de hora y ademas el .slice(0, 5) elimina los segundos de forma que solo se coge hora y minutos
        trabajador: (trabajador as { id?: number })?.id ?? trabajador //Para que funcione hay que forzar a que sea de tipo number, ademas de poner interrogantes para que si es un objeto obtener su id y si es un numero usarlo directamente
      }));
      console.log("Citas: ", response);
    }, (error) => {
      console.error("Error al obtener citas:", error);
    });
  }

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUsuario).subscribe((response) => {
      this.allWorkers = response.filter(user => user.rol === "ROL_TRABAJADOR"); //Solo pasan al array los usuarios con el rol de trabajador
      console.log("Usuarios: ", response);
    }, (error) => {
      console.error("Error al obtener usuarios:", error);
    });
  }

  reactiveForm = new FormGroup({
    tipoReserva: new FormControl(''),
    opcionAdicional: new FormControl(''),
    worker: new FormControl(null),
    fecha: new FormControl(''),
    hora: new FormControl(''),
    comentario: new FormControl(''),
    pagoEfectivo: new FormControl(false)
  });

  public onSubmit(): void {
    this.crearCita();
    this.createServicio();
    console.log(this.reactiveForm.value.pagoEfectivo);
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

  public selectTime(): void {
    let selectedWorker = Number(this.reactiveForm.value.worker);
    let selectedDate = this.reactiveForm.value.fecha;

    if (!selectedWorker || !selectedDate) {
      this.hours = [];
    } else {
      // Restauramos las horas originales antes de filtrar
      this.hours = [
        "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
        "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
      ].filter(hour => {
        return !this.citasOcupadas.some(cita =>
          cita.trabajador === selectedWorker &&
          cita.fecha === selectedDate &&
          cita.hora === hour
        );
      });
    }
  }

  public crearCita(): void {
    let selectedDate = this.reactiveForm.value.fecha ?? "";
    let selectedHour = this.reactiveForm.value.hora ?? "";
    let fechaCompleta = selectedDate && selectedHour ? `${selectedDate}T${selectedHour}` : "";
    let loginUser = parseInt(localStorage.getItem('userId') || '0', 10); //Es un string, mediante parseInt forzamos a que sea numerico
    let pago: boolean = false;
    if (this.reactiveForm.value.pagoEfectivo === false) {
      pago = true;
    } else {
      pago = false;
    }
    const nuevaCita: Cita = {
      fecha: fechaCompleta,
      precio: this.price,
      pagado: pago,
      cliente: loginUser,
      trabajador: this.reactiveForm.value.worker ?? 0
    };
    
    console.log(nuevaCita)

    console.log("Cita añadida");

    this.service.postCita(this.apiUrlCita, nuevaCita).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    );
  }

  public createServicio(): void {
    const newService: Servicio = {
      nombre: this.reactiveForm.value.opcionAdicional ?? "",
      descripcion: this.reactiveForm.value.comentario ?? "",
      precio: this.price,
      stock: null,
      imagen: null
    }

    this.service.createServicio(this.apiUrlServicio, newService).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => console.error('Error al crear cita:', error)
    );
  }

}

