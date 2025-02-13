import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-tienda',
  imports: [CardComponent],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export class TiendaComponent {
  productos = [
    { id: 1, nombre: 'Producto 1', imagen: 'ruta1.jpg', precio: 45.50 },
    { id: 2, nombre: 'Producto 2', imagen: 'ruta2.jpg', precio: 30.00 },
    { id: 3, nombre: 'Producto 3', imagen: 'ruta3.jpg', precio: 25.00 },
    { id: 4, nombre: 'Producto 4', imagen: 'ruta4.jpg', precio: 50.00 },
    { id: 5, nombre: 'Producto 5', imagen: 'ruta5.jpg', precio: 60.00 },
    { id: 6, nombre: 'Producto 6', imagen: 'ruta6.jpg', precio: 70.00 },
    { id: 7, nombre: 'Producto 7', imagen: 'ruta7.jpg', precio: 20.00 },
    { id: 8, nombre: 'Producto 8', imagen: 'ruta8.jpg', precio: 35.00 },
    { id: 9, nombre: 'Producto 9', imagen: 'ruta9.jpg', precio: 40.00 },
  ];
}
