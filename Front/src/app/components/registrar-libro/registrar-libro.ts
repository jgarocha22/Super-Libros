import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { LibroService } from '../../services/libro.service';

@Component({
  selector: 'app-registrar-libro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrar-libro.html',
  styleUrl: './registrar-libro.css',
})
export class RegistrarLibro implements OnInit {
  @Output() libroGuardadoExitoso = new EventEmitter<void>();
  @Output() cerrar = new EventEmitter<void>();
  @Input() libroAEditar: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private libroService: LibroService) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      autor: ['', Validators.required],
      editorial: ['', Validators.required],
      sinopsis: ['', Validators.required],
      imagenurl: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      tags: ['', Validators.required],
      stock: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
  if (this.libroAEditar) {
    // Si los tags vienen como Array del backend, los unimos con coma para el input de texto
    const datosFormulario = { ...this.libroAEditar };
    if (Array.isArray(datosFormulario.tags)) {
      datosFormulario.tags = datosFormulario.tags.join(', ');
    }
    
    // Rellena automáticamente todos los campos mapeados del formulario
    this.form.patchValue(datosFormulario);
  }
  }

  mensaje: string = '';
  esError: boolean = false;
  limpiarFormulario() {
    this.form.reset({
      nombre: '',
      autor: '',
      editorial: '',
      sinopsis: '',
      imagenurl: '',
      tags: '',
      precio: 0,
      stock: 0
    });
  }
enviar() {
  if (this.form.valid) {
    const libroData = { ...this.form.value };

    if (typeof libroData.tags === 'string') {
      libroData.tags = libroData.tags.split(',').map((tag: string) => tag.trim());
    }

    if (this.libroAEditar) {
      // MODO EDICIÓN
      this.libroService.actualizarLibro(this.libroAEditar.id, libroData).subscribe({
        next: () => {
          alert("¡Libro modificado correctamente!");
          this.form.reset();
          this.libroGuardadoExitoso.emit();
          this.cerrar.emit();
        },
        error: (err) => {
          alert("Error: " + (err.error || "No se pudo modificar"));
        }
      });
    } else {
      // MODO CREACIÓN
      this.libroService.crearLibro(libroData).subscribe({
        next: () => {
          alert("¡Libro registrado correctamente!");
          this.form.reset();
          this.libroGuardadoExitoso.emit();
        },
        error: (err) => {
          alert("Error: " + (err.error || "No se pudo registrar"));
        }
      });
    }

  } else {
    this.form.markAllAsTouched();
    alert("Por favor, corrige los errores antes de guardar.");
    return;
  }
}

  
}

