export interface Cliente {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    dni: string;
    contrasenya?: string; // Opcional para seguridad, puede no ser devuelto por la API
  }
  