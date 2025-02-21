import {Component} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public userStartSesion: boolean = false;

  constructor() {
    this.userStartSesion = localStorage.getItem('userId') !== null;
  }
}
