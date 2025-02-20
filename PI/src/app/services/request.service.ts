import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cita, CitaNueva, LoginResponse, Servicio, Usuario} from '../models/response.interface';

@Injectable({
  providedIn: 'root',
})

export class RequestService {

  private apiUrlProfile = 'http://52.205.151.118/perfil'; //No se usa
  private apiUrlAppointments = 'http://52.205.151.118/citas'; //No se usa


  constructor(private http: HttpClient) {
  }


  public login(url: string, credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(url, credentials);
  }

  public getUsuarios(url: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(url);
  }

  public getUsuario(url: string): Observable<Usuario> {
    return this.http.get<Usuario>(url);
  }

  public createUsuario(url: string, usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  public getCitas(url: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(url);
  }

  public postCita(url: string, cita: CitaNueva): Observable<any> {
    return this.http.post<any>(url, cita);
  }

  public getServicios(url: string): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(url);
  }

  public createServicio(url: string, servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(url, servicio);
  }

  public deleteCita(url: string) {
    return this.http.delete(url);
  }

  public deleteProducto(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }

  public postProducto(url: string, producto: any): Observable<any> {
    return this.http.post<any>(url, producto);
  }
  

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

