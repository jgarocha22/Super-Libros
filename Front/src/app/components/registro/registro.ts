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
  
  mensajeExito = signal<string>('');
  mensajeError = signal<string>('');

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

      this.mensajeExito.set('');
      this.mensajeError.set('');

      this.compradorService.registrar(this.formRegistro.value).subscribe({
        next: (response) => {
          console.log('¡Comprador guardado en el JSON!', response);
          this.mensajeExito.set('🎉 ¡Registro exitoso! Ya puedes iniciar sesión.');
          this.formRegistro.reset(); 
        },
        error: (err) => {
          console.error('Error capturado desde el Back:', err);
          this.mensajeError.set(err.error || 'Ocurrió un error inesperado al registrar.');
        }
      });
    } else {
      this.formRegistro.markAllAsTouched();
    }
  }
}