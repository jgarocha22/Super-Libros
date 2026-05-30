import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private router = inject(Router);
  public loginService = inject(LoginService);

  get inicialUsuario(): string {
    const user = this.loginService.currentUser();
    return user && user.username ? user.username.charAt(0).toUpperCase() : '?';
  }

  manejarClickCarrito() {
    const usuarioActual = this.loginService.currentUser();
    
    if (usuarioActual) {
      // Si por alguna razón un ADMIN intenta activar el evento, lo bloqueamos
      if (usuarioActual.rol === 'ADMIN') return; 
      
      this.router.navigate(['/carrito']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion() {
    this.loginService.logout(); 
    this.router.navigate(['/login']);
  }
}