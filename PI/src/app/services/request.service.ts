import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/response.interfaceCita';
import { Trabajador } from '../models/response.interfaceTrabajador';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}
  
  public getServicios(url: string): Observable<any[]> { 
    return this.http.get<any[]>(url);
  }

  public postCita(url: string, cita: Cita): Observable<any> { 
    return this.http.post<any>(url, cita); 
  }

  public getTrabajadores(url: string): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(url);
  }
  
  
}
