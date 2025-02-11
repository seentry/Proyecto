import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InicioComponent } from '../../views/inicio/inicio.component';

@Component({
  selector: 'app-header',
  imports: [InicioComponent, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
