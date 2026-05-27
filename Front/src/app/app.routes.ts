import { Routes } from '@angular/router';
//import { CatalogoComponent } from './components/catalogo/catalogo'; // Suponiendo que crees o tengas este para ver los libros
import { LoginComponent } from './components/login/login';
import { RegistroComponent } from './components/registro/registro';

export const routes: Routes = [
  // La raíz ahora muestra el catálogo directamente a los visitantes
  //{ path: '', component: CatalogoComponent }, 
  
  // Rutas específicas para cuando decidan iniciar sesión o registrarse
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  
  // Comodín por si escriben una ruta que no existe, los manda de vuelta al catálogo
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];