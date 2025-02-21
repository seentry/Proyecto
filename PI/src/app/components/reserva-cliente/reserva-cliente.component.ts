import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestService} from '../../services/request.service';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Cita, CitaNueva, Servicio, Usuario} from '../../models/response.interface';

@Component({
  selector: 'app-reserva-cliente',
  imports: [CommonModule, ReactiveFormsModule,],
  templateUrl: './reserva-cliente.component.html',
  styleUrl: './reserva-cliente.component.css'
})

export class ReservaClienteComponent implements OnInit {

  public loginUser = localStorage.getItem('userId')
  public price: number = 0;
  public servicios: Servicio[] = [];
  public hours: string[] = [
    "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
  ];
  public citasOcupadas: { fecha: string; hora: string; trabajador: number }[] = [];
  public allWorkers: Usuario[] = [];
  reactiveForm = new FormGroup({
    tipoReserva: new FormControl(0),
    worker: new FormControl(null),
    fecha: new FormControl(''),
    hora: new FormControl(''),
    comentario: new FormControl(''),
    pagoEfectivo: new FormControl(false)
  });
  private apiUrlCita: string = 'http://52.205.151.118/api/cita';
  private apiUrlUsuario: string = 'http://52.205.151.118/api/usuario';
  private apiUrlServicio: string = 'http://52.205.151.118/api/servicio';
  private citas: Cita[] = [];

  constructor(private service: RequestService) {
  }

  public ngOnInit(): void {
    this.getServicios();
    this.getUsuarios();
    this.getCitas();
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrlServicio).subscribe((response) => {
      this.servicios = response;
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }

  public getCitas(): void {
    this.service.getCitas(this.apiUrlCita).subscribe((response) => {
      this.citas = response;
      this.citasOcupadas = this.citas.map(({fecha, trabajador}) => ({
        fecha: fecha.split('T')[0], //el split('T')[0] fuerza a que la fecha sea de tipo ISO 8601 para que sea comptible con la API, ademas la posicion 0 coge solo el campo de fecha
        hora: fecha.split('T')[1].slice(0, 5), //La posicion de 1 coge el campos de hora y ademas el .slice(0, 5) elimina los segundos de forma que solo se coge hora y minutos
        trabajador: (trabajador as { id: number }).id ?? trabajador.id //Para que funcione hay que forzar a que sea de tipo number, ademas de poner interrogantes para que si es un objeto obtener su id y si es un numero usarlo directamente
      }));
    }, (error) => {
      console.error("Error al obtener citas:", error);
    });
  }

  public getUsuarios(): void {
    this.service.getUsuarios(this.apiUrlUsuario).subscribe((response) => {
      this.allWorkers = response.filter(user => user.rol === "ROL_TRABAJADOR"); //Solo pasan al array los usuarios con el rol de trabajador
    }, (error) => {
      console.error("Error al obtener usuarios:", error);
    });
  }

  public onSubmit(): void {
    this.crearCita();
    console.log(this.reactiveForm.value.pagoEfectivo);
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
    let pago: boolean;
    pago = this.reactiveForm.value.pagoEfectivo === false;
    const nuevaCita: CitaNueva = {
      fecha: fechaCompleta,
      precio: this.price,
      pagado: pago,
      servicio: this.reactiveForm.value.tipoReserva!,
      cliente: loginUser,
      trabajador: this.reactiveForm.value.worker ?? 0
    };

    console.log(nuevaCita);

    console.log("Cita añadida");

    this.service.postCita(this.apiUrlCita, nuevaCita).subscribe(
      (response) => console.log('Cita creada con éxito:', response),
      (error) => alert("Cita creada con éxito.")
    );
  }

  changedProduct() {
    this.price = this.servicios.find(servicio => servicio.id == this.reactiveForm.value.tipoReserva)?.precio!
  }
}

