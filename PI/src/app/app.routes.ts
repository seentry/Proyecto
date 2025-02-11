import { Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { ContactoComponent } from './views/contacto/contacto.component';

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'contacto', component: ContactoComponent},
    {path: 'contacto', redirectTo: 'contacto', pathMatch: 'full'}
];
