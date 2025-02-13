import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  
  public servicios: any[] = []; 

  constructor(private service: RequestService) {}

  private apiUrl = 'http://127.0.0.1:8000/cita';

  ngOnInit(): void {
    this.getServicios();
  }

  public getServicios(): void {
    this.service.getServicios(this.apiUrl).subscribe((response) => {
      console.log(response); 
      this.servicios = response; 
    }, (error) => {
      console.error("Error al obtener servicios:", error);
    });
  }
}
