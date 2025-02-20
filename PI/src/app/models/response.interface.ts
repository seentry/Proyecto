export interface LoginRequest {
  email: string;
  contrasena: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  rol: "ROL_ADMIN" | "ROL_TRABAJADOR" | "ROL_CLIENTE";
}

export interface Usuario {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  dni: string;
  rol: "ROL_ADMIN" | "ROL_TRABAJADOR" | "ROL_CLIENTE";
  contrasena?: string;
}

export interface Cita {
  id?: number;
  fecha: string;
  precio: number;
  pagado: boolean;
  cliente: Usuario;
  trabajador: Usuario;
  servicio:Servicio
}

export interface CitaNueva {
  id?: number;
  fecha: string;
  precio: number;
  pagado: boolean;
  cliente: number;
  trabajador: number;
  servicio: number;
}

export interface Opinion {
  id: number;
  titulo: string;
  descripcion: string;
  valoracion: number;
  usuario: Usuario;
}

export interface Servicio {
  id?: number;
  nombre: string;
  descripcion: string;
  stock: number|null;
  precio: number;
  imagen?: string | null;
}
