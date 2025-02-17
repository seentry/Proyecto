import { Routes } from '@angular/router';
import { InicioComponent } from './views/inicio/inicio.component';
import { ContactoComponent } from './views/contacto/contacto.component';
import { TiendaComponent } from './views/tienda/tienda.component';
import { ReservaComponent } from './views/reserva/reserva.component';
import { CentroComponent } from './views/centro/centro.component';
import { IniciarSesionComponent } from './views/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './views/registrarse/registrarse.component';
<<<<<<< HEAD
import { GestionTrabajadoresComponent } from './views/gestion-trabajadores/gestion-trabajadores.component';
import { GestionProductosComponent } from './views/gestion-productos/gestion-productos.component';
=======
import { MiPerfilComponent } from './views/mi-perfil/mi-perfil.component';
>>>>>>> 1efe782f8a968b43ee68721ba11b6321ea1d96ff

export const routes: Routes = [
    {path: 'inicio', component: InicioComponent},
    {path: 'centro', component: CentroComponent},
    {path: 'tienda', component: TiendaComponent},
    {path: 'reserva', component: ReservaComponent},
    {path: 'contacto', component: ContactoComponent},
    {path: 'inicio_sesion', component: IniciarSesionComponent},
    {path: 'registrarse', component: RegistrarseComponent},
<<<<<<< HEAD
    {path: 'gestion_trabajadores', component: GestionTrabajadoresComponent},
    {path: 'gestion_productos', component: GestionProductosComponent},
=======
    {path: 'mi_perfil', component: MiPerfilComponent},
>>>>>>> 1efe782f8a968b43ee68721ba11b6321ea1d96ff

    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
];
