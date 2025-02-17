import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/response.interfaceClientes';
import { Cita } from '../models/response.interfaceCita';

@Injectable({
  providedIn: 'root',
})

export class RequestService {
  
  private apiUrlProfile = 'http://127.0.0.1:8000/perfil';
  private apiUrlAppointments = 'http://127.0.0.1:8000/citas';

  constructor(private http: HttpClient) {}

  public getServicios(url: string): Observable<any[]> { 
    return this.http.get<any[]>(url);
  }

  // Método para obtener los datos del perfil del usuario
  public getProfile(): Observable<Cliente> {
    return this.http.get<Cliente>(this.apiUrlProfile);
  }


// Método para obtener las citas del usuario
  public getAppointments(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrlAppointments);
  }

  // Método para cancelar una cita por ID
  public cancelAppointment(id: number): Observable<void> {
    const cancelUrl = `${this.apiUrlAppointments}/${id}/cancelar`;
    return this.http.post<void>(cancelUrl, {});
  }
}
