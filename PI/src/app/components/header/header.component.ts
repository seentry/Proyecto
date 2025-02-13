import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InicioComponent } from '../../views/inicio/inicio.component';
import { HeaderInicioComponent } from '../header-inicio/header-inicio.component';

@Component({
  selector: 'app-header',
  imports: [InicioComponent, RouterLink, RouterLinkActive,HeaderInicioComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
