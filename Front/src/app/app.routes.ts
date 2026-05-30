import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';
import { PerfilComponent } from './components/perfil/perfil';
import { Catalogo } from './components/catalogo/catalogo';
import { CarritoComponent } from './components/carrito/carrito';

// 🚀 1. Importamos los componentes del panel de administración
import { AdminPanelComponent } from './components/admin-panel/admin-panel';
import { GestionPerfilComponent } from './components/gestion-perfil/gestion-perfil';
import { GestionLibrosComponent } from './components/gestion-libros/gestion-libros';
import { GestionResenasComponent } from './components/gestion-resenas/gestion-resenas';

export const routes: Routes = [
  // La raíz ahora muestra el catálogo directamente a los visitantes
  { path: '', component: Catalogo },
  { path: 'catalogo', component: Catalogo },
  { path: 'carrito', component: CarritoComponent },
  
  // Rutas específicas para cuando decidan iniciar sesión o registrarse
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'perfiles', pathMatch: 'full' }, // Si entran a /admin-panel va directo a perfiles
      { path: 'perfiles', component: GestionPerfilComponent },   // 👈 Carga la tabla de usuarios
      { path: 'libros', component: GestionLibrosComponent },       // 👈 Carga la tabla de libros sincronizada con tu Back
      { path: 'resenas', component: GestionResenasComponent } // Próximamente...
    ]
  },
  
  // Comodín por si escriben una ruta que no existe, los manda de vuelta al catálogo
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];