import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderInicioComponent} from './components/header-inicio/header-inicio.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, HeaderInicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PI';

  constructor(private router: Router) {
  }

  get isHomePage(): boolean {
    return this.router.url === '/inicio' || this.router.url === '/' || this.router.url === '/inicio#startPage';
  }
}
