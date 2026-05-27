import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, JsonPipe } from '@angular/common';
import { CompradorService } from '../../services/comprador.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, JsonPipe],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  formRegistro: FormGroup;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
  
  // Variables para mostrar feedback de alertas del servidor en la vista
  mensajeExito = signal<string>('');
  mensajeError = signal<string>('');

  // Inyectamos el FormBuilder y nuestro nuevo CompradorService
  constructor(private fb: FormBuilder, private compradorService: CompradorService) {
    this.formRegistro = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      confirmPassword: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.formRegistro.valid) {
      // 1. ¡IMPORTANTÍSIMO! Limpiamos ambos mensajes antes de hablar con el servidor
      // Esto hace que el mensaje viejo desaparezca instantáneamente al hacer clic
      this.mensajeExito.set('');
      this.mensajeError.set('');

      this.compradorService.registrar(this.formRegistro.value).subscribe({
        next: (response) => {
          console.log('¡Comprador guardado en el JSON!', response);
          // 2. Si todo sale bien, solo activamos el de éxito
          this.mensajeExito.set('🎉 ¡Registro exitoso! Ya puedes iniciar sesión.');
          this.formRegistro.reset(); 
        },
        error: (err) => {
          console.error('Error capturado desde el Back:', err);
          // 3. Si falla (por ejemplo, usuario duplicado), solo activamos el de error
          this.mensajeError.set(err.error || 'Ocurrió un error inesperado al registrar.');
        }
      });
    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}