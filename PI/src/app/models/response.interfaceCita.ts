import { Cliente } from "./response.interfaceClientes";
import { Trabajador } from "./response.interfaceTrabajador";

export interface Cita {
    id: number;
    fecha: string; // Formato ISO 8601 (YYYY-MM-DDTHH:MM:SS)
    precio: number;
    pagado: boolean;
    cliente: Cliente;
    trabajador?: Trabajador; // Puede ser opcional si no todas las citas tienen trabajador asignado
  }