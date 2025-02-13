import { Component} from '@angular/core';
import { Router  } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IniciarSesionComponent } from './views/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
<<<<<<< HEAD
import { ReservaComponent } from './views/reserva/reserva.component';
=======
import { HeaderInicioComponent } from './components/header-inicio/header-inicio.component';
>>>>>>> 737bb9ab92c7cb989e591249f499e2bb343838cb


@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IniciarSesionComponent, RegistrarseComponent, ReservaComponent],
=======
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IniciarSesionComponent, RegistrarseComponent, HeaderInicioComponent],
>>>>>>> 737bb9ab92c7cb989e591249f499e2bb343838cb
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
