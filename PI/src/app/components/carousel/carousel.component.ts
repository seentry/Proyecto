import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  
  /*
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() assessment: number = 0;
  @Input() user: any = '';
  */

  @Input() opiniones: any[] = [];

}
