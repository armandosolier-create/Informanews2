import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(4)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get nombreControl() { return this.contactoForm.get('nombre'); }
  get correoControl() { return this.contactoForm.get('correo'); }
  get asuntoControl() { return this.contactoForm.get('asunto'); }
  get mensajeControl() { return this.contactoForm.get('mensaje'); }

  get hayErrores(): boolean {
    return this.contactoForm.invalid;
  }

  get hayExitos(): boolean {
    return (
      (this.nombreControl?.valid ?? false) ||
      (this.correoControl?.valid ?? false) ||
      (this.asuntoControl?.valid ?? false) ||
      (this.mensajeControl?.valid ?? false)
    );
  }

  getMensajeErrorNombre(): string {
    if (this.nombreControl?.hasError('required')) return 'Nombre es obligatorio.';
    return 'Nombre debe tener al menos 3 caracteres.';
  }

  getMensajeErrorCorreo(): string {
    if (this.correoControl?.hasError('required')) return 'Correo electrónico es obligatorio.';
    return 'Ingresa un correo electrónico válido.';
  }

  getMensajeErrorAsunto(): string {
    if (this.asuntoControl?.hasError('required')) return 'Asunto es obligatorio.';
    return 'El asunto debe tener al menos 4 caracteres.';
  }

  getMensajeErrorMensaje(): string {
    if (this.mensajeControl?.hasError('required')) return 'Mensaje es obligatorio.';
    return 'El mensaje debe tener al menos 10 caracteres.';
  }

  onSubmit(): void {
    if (this.contactoForm.valid) {
      alert('¡Mensaje enviado con éxito!');
      this.contactoForm.reset();
    }
  }
}
