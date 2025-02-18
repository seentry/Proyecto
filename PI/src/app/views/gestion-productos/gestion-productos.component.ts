import { Component } from '@angular/core';
import { CardGestionProductosComponent } from '../../components/card-gestion-productos/card-gestion-productos.component';

@Component({
  selector: 'app-gestion-productos',
  imports: [CardGestionProductosComponent],
  templateUrl: './gestion-productos.component.html',
  styleUrl: './gestion-productos.component.css'
})
export class GestionProductosComponent {

  public items = new Array(10);
}
