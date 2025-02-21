import {Routes} from '@angular/router';
import {InicioComponent} from './views/inicio/inicio.component';
import {ContactoComponent} from './views/contacto/contacto.component';
import {TiendaComponent} from './views/tienda/tienda.component';
import {ReservaComponent} from './views/reserva/reserva.component';
import {CentroComponent} from './views/centro/centro.component';
import {IniciarSesionComponent} from './views/iniciar-sesion/iniciar-sesion.component';
import {RegistrarseComponent} from './views/registrarse/registrarse.component';
import {MiPerfilComponent} from './views/mi-perfil/mi-perfil.component';

export const routes: Routes = [
  {path: 'inicio', component: InicioComponent},
  {path: 'centro', component: CentroComponent},
  {path: 'tienda', component: TiendaComponent},
  {path: 'reserva', component: ReservaComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'inicio_sesion', component: IniciarSesionComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: 'mi_perfil', component: MiPerfilComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
];
