export interface LoginRequest {
    email: string;
    contrasenya: string;
  }
  
  export interface LoginResponse {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;
    salario?: number; // Solo si es trabajador
  }
  