import { Cliente } from "./response.interfaceClientes";
import { Trabajador } from "./response.interfaceTrabajador";
export interface Cita {
  fecha: string;
  precio: number;
  pagado: boolean;
  cliente: number;  
  trabajador: number; 
}



