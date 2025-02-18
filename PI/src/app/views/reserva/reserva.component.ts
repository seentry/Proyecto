import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Servicio, Cita, Usuario } from '../../models/response.interface';
import { ReservaClienteComponent } from '../../components/reserva-cliente/reserva-cliente.component';

@Component({
  selector: 'app-reserva',
  imports: [ReactiveFormsModule, ReservaClienteComponent],
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent {

}
