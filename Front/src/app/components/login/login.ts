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
          
          // Guardamos el objeto completo del usuario (incluyendo el .rol) en el Signal
          this.loginService.setCurrentUser(response);

          setTimeout(() => {
            // Evaluamos el rol devuelto por tu Backend para decidir a dónde enviarlo
            if (response.rol === 'ADMIN') {
              // Redirige al Home/Dashboard administrativo
              this.router.navigate(['/home']); 
            } else {
              // Redirige a la página principal de compradores (Catálogo)
              this.router.navigate(['/']); 
            }
          }, 800);

          this.cdr.detectChanges(); 
        },
        error: (err: any) => {
          console.error('❌ [Back Response]: Error en la autenticación.');
        
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