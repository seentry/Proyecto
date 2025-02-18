import { Component} from '@angular/core';
import { Router  } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IniciarSesionComponent } from './views/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
import { HeaderInicioComponent } from './components/header-inicio/header-inicio.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IniciarSesionComponent, RegistrarseComponent, HeaderInicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PI';
  constructor(private router: Router) {}

  get isHomePage(): boolean {
    return this.router.url === '/inicio' || this.router.url === '/';
  }
}