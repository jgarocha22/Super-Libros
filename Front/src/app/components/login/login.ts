import { Component, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  errorMessage: string | null = null;
  successMessage: string | null = null;

  formLogin = new FormGroup({
    identifier: new FormControl('', [Validators.required]), 
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  onLogin() {
    if (this.formLogin.valid) {
      this.errorMessage = null;
      this.successMessage = null;

      this.loginService.login(this.formLogin.value).subscribe({
        next: (response: any) => {
          console.log('✅ [Back Response]: ¡Usuario encontrado con éxito!', response);
          
          this.successMessage = '🎉 ¡Inicio de sesión exitoso! Redirigiendo...';
          
          this.loginService.setCurrentUser(response);

          setTimeout(() => {
            if (response && response.rol === 'ADMIN') {
              console.log('👑 Detectado como ADMIN. Redirigiendo a admin-panel...');
              this.router.navigate(['/admin-panel/perfiles']);
            } else {
              console.log('🛒 Detectado como COMPRADOR/Invitado. Redirigiendo al catálogo...');
              this.router.navigate(['/']); // Redirige a la ruta raíz
            }
          }, 800);

          // OBLIGA a Angular a actualizar el HTML
          this.cdr.detectChanges(); 
        },
        error: (err: any) => {
          console.error('❌ [Back Response]: Error en la autenticación.', err);
        
          if (err.status === 401) {
            this.errorMessage = '🔑 El usuario o la contraseña son incorrectos.';
          } else {
            this.errorMessage = '⚠️ Hubo un problema de conexión con el servidor.';
          }
          this.cdr.detectChanges();
        }
      });
    }
  }
}