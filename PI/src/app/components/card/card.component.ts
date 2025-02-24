import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() price: number = 0;
  @Input() stock: number | null = 0;
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() img: string | null = '';

}

