import { Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { TiendaComponent } from './views/tienda/tienda.component';
import { ReservaComponent } from './views/reserva/reserva.component';
import { CentroComponent } from './views/centro/centro.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'centro', component: CentroComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'reserva', component: ReservaComponent},
    {path: 'contacto', component: ContactoComponent},

    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
];
