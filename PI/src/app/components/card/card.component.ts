import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() price: number = 0;
  @Input() stock: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() img: string = '';

}

