import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-gestion-productos',
  imports: [],
  templateUrl: './card-gestion-productos.component.html',
  styleUrl: './card-gestion-productos.component.css'
})
export class CardGestionProductosComponent {


  @Input() servicio: string = "";
  @Input() stock: number = 0;
  @Input() precio: number = 0;
  
}
