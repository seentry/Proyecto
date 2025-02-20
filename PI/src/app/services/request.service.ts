import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita, Usuario, Servicio, Opinion, LoginRequest, LoginResponse } from '../models/response.interface';
@Injectable({
  providedIn: 'root',
})

export class RequestService {
  
  private apiUrlProfile = 'http://127.0.0.1:8000/perfil'; //No se usa 
  private apiUrlAppointments = 'http://127.0.0.1:8000/citas'; //No se usa 

  constructor(private http: HttpClient) {}


  public login(url: string, credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(url, credentials);
  }

  public getUsuarios(url: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(url);
  }

  public createUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  public getCitas(url: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(url);
  }
  public postCita(url: string, cita: Cita): Observable<any> { 
    return this.http.post<any>(url, cita); 
  }

  public getServicios(url: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(url);
  }

  public createServicio(url: string, servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(url, servicio);
  }

  public getOpiniones(url: string): Observable<Opinion[]> { 
    return this.http.get<Opinion[]>(url);
  }


/*
  // --------- USUARIOS (CLIENTES/TRABAJADORES) ---------


  public getUsuarioById(url: string): Observable<Usuario> {
    return this.http.get<Usuario>(url);
  }

  public createUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  // --------- CITAS ---------

  public getCitaById(url: string): Observable<Cita> {
    return this.http.get<Cita>(url);
  }

  public postCita(url: string, cita: Cita): Observable<Cita> { //ya usado
    return this.http.post<Cita>(url, cita);
  }

  public updateCitaFecha(url: string, id: number, fecha: string): Observable<Cita> {
    return this.http.post<Cita>(url, { id, fecha });
  }

  // --------- SERVICIOS ---------


  public createServicio(url: string, servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(url, servicio);
  }

  // --------- OPINIONES ---------
  
  public getOpiniones(url: string): Observable<Opinion[]> { //Falta crear opiniones
    return this.http.get<Opinion[]>(url);
  }

  public createOpinion(url: string, opinion: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(url, opinion);
  }
    */
}
