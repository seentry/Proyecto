import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IniciarSesionComponent } from './views/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
import { ReservaComponent } from './views/reserva/reserva.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, IniciarSesionComponent, RegistrarseComponent, ReservaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PI';
}
