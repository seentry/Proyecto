import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css'
})
export class CardProductoComponent {

  @Input() price: number = 0;
  @Input() stock: number = 0;
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() img: string = '';
  @Input() id: number = 0;

  @Output() delete = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.id);
  }
}
