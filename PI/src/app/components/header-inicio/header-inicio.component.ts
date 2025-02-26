import {Component} from '@angular/core';

@Component({
  selector: 'app-header-inicio',
  imports: [],
  templateUrl: './header-inicio.component.html',
  styleUrl: './header-inicio.component.css'
})
export class HeaderInicioComponent {
  public userStartSesion: boolean = false;

  constructor() {
    this.userStartSesion = localStorage.getItem('userId') !== null;
  }
}
