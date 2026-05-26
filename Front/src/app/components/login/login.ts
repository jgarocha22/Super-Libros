import { Component, ChangeDetectorRef } from '@angular/core'; // <-- 1. IMPORTA 'ChangeDetectorRef'
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'; 

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
    private cdr: ChangeDetectorRef 
  ) {}

  onLogin() {
    if (this.formLogin.valid) {
      this.errorMessage = null;
      this.successMessage = null;

      this.loginService.login(this.formLogin.value).subscribe({
        next: (response: any) => {
          console.log('✅ [Back Response]: ¡Usuario encontrado con éxito!', response);
          
          this.successMessage = '🎉 ¡Inicio de sesión exitoso! (Modo prueba: redirección desactivada)';
          localStorage.setItem('usuarioLogueado', JSON.stringify(response));

          // 3. OBLIGA a Angular a actualizar el HTML justo ahora
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