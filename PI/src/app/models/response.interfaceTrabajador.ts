export interface Trabajador {
    id: number;
    nombre: string;
    apellidos: string;
    dni: string;
    email: string;
    salario: number;
    contrasenya?: string; // También opcional por seguridad
  }
  