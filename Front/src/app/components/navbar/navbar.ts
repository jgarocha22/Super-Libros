import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Ajusta la ruta a tu servicio

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private router = inject(Router);
  
  // Inyectamos el servicio público para poder usar su 'currentUser' en el HTML
  public loginService = inject(LoginService);

  // Mantenemos la lógica de la inicial usando el valor del signal
  get inicialUsuario(): string {
    const user = this.loginService.currentUser();
    return user && user.username ? user.username.charAt(0).toUpperCase() : '?';
  }

  manejarClickCarrito() {
    if (this.loginService.currentUser()) {
      this.router.navigate(['/carrito']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.loginService.logout(); // Limpia el signal y el localStorage desde el servicio
    this.router.navigate(['/login']);
  }
}