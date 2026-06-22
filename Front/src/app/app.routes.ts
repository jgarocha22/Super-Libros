import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { PerfilComponent } from './components/perfil/perfil';
import { Catalogo } from './components/catalogo/catalogo';
import { CarritoComponent } from './components/carrito/carrito';

import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { GestionPerfilComponent } from './components/gestion-perfil/gestion-perfil';
import { GestionLibrosComponent } from './components/gestion-libros/gestion-libros';
import { GestionResenasComponent } from './components/gestion-resenas/gestion-resenas';
import { DetalleLibroComponent } from './components/detalle-libro/detalle-libro';

export const routes: Routes = [

  { path: '', component: Catalogo },
  { path: 'catalogo', component: Catalogo },
  { path: 'carrito', component: CarritoComponent },


  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'detalle-libro/:id', component: DetalleLibroComponent},
  
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'perfiles', pathMatch: 'full' },
      { path: 'perfiles', component: GestionPerfilComponent },
      { path: 'libros', component: GestionLibrosComponent },
      { path: 'resenas', component: GestionResenasComponent }
    ]
  },
  
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];
