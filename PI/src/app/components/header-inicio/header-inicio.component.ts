import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InicioComponent } from '../../views/inicio/inicio.component';
@Component({
  selector: 'app-header-inicio',
  imports: [InicioComponent, RouterLink, RouterLinkActive],
  templateUrl: './header-inicio.component.html',
  styleUrl: './header-inicio.component.css'
})
export class HeaderInicioComponent {

}
