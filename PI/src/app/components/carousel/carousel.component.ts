import {NgStyle} from '@angular/common';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() opiniones: any[] = [];

  getStarColors(valoracion: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (i < valoracion) {
        colors.push('yellow');
      } else {
        colors.push('grey');
      }
    }
    return colors;
  }
}
