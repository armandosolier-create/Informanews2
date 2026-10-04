import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-admin-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container crud-container">
      <h2>Panel de Administración de Noticias</h2>

      <!-- Formulario para Crear / Editar -->
      <div class="card-form">
        <h3>{{ editando ? 'Editar Noticia' : 'Crear Nueva Noticia' }}</h3>
        <form (ngSubmit)="guardar()">
          <div class="form-group">
            <label>Título</label>
            <input type="text" [(ngModel)]="formNoticia.titulo" name="titulo" required class="input-control">
          </div>

          <div class="form-group">
            <label>Categoría</label>
            <select [(ngModel)]="formNoticia.categoria" name="categoria" class="input-control">
              <option value="TECNOLOGÍA">TECNOLOGÍA</option>
              <option value="TURISMO">TURISMO</option>
              <option value="EDUCACIÓN">EDUCACIÓN</option>
              <option value="COMERCIO">COMERCIO</option>
            </select>
          </div>

          <div class="form-group">
            <label>Resumen</label>
            <input type="text" [(ngModel)]="formNoticia.resumen" name="resumen" required class="input-control">
          </div>

          <!-- Campo para la URL de la imagen -->
          <div class="form-group">
            <label>URL de la Imagen (Opcional - asigna por defecto según categoría)</label>
            <input 
              type="url" 
              [(ngModel)]="formNoticia.imagenUrl" 
              name="imagenUrl" 
              placeholder="https://ejemplo.com/imagen.jpg" 
              class="input-control"
            >
            <div *ngIf="formNoticia.imagenUrl" class="image-preview">
              <img [src]="formNoticia.imagenUrl" alt="Vista previa" (error)="onImageError($event)">
            </div>
          </div>

          <div class="form-group">
            <label>Contenido</label>
            <textarea [(ngModel)]="formNoticia.contenido" name="contenido" rows="4" class="input-control"></textarea>
          </div>

          <div class="form-checkbox">
            <label>
              <input type="checkbox" [(ngModel)]="formNoticia.esDestacada" name="esDestacada"> Marcar como Destacada
            </label>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-save">{{ editando ? 'Guardar Cambios' : 'Crear Noticia' }}</button>
            <button type="button" *ngIf="editando" (click)="cancelarEdicion()" class="btn btn-cancel">Cancelar</button>
          </div>
        </form>
      </div>

      <!-- Lista de Noticias Registradas -->
      <div class="table-responsive">
        <table class="crud-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Categoría</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of listaNoticias">
              <td>
                <img [src]="item.imagenUrl || obtenerImagenPorDefecto(item.categoria)" class="table-thumb" alt="Miniatura">
              </td>
              <td>{{ item.titulo }}</td>
              <td><span class="badge">{{ item.categoria }}</span></td>
              <td>{{ item.fecha }}</td>
              <td>
                <button (click)="cargarEdicion(item)" class="btn-action edit">Editar</button>
                <button (click)="eliminar(item.id)" class="btn-action delete">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .crud-container { max-width: 1000px; margin: 2rem auto; padding: 0 1rem; }
    .card-form { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem; }
    .form-group { margin-bottom: 1rem; }
    .form-group label { display: block; font-weight: 600; margin-bottom: 0.4rem; font-size: 0.9rem; }
    .input-control { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; box-sizing: border-box; }
    .form-checkbox { margin-bottom: 1rem; }
    .form-actions { display: flex; gap: 0.5rem; }
    .btn { padding: 0.6rem 1.2rem; border-radius: 6px; border: none; font-weight: 600; cursor: pointer; }
    .btn-save { background: #2563eb; color: #fff; }
    .btn-cancel { background: #64748b; color: #fff; }
    .crud-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    .crud-table th, .crud-table td { padding: 0.8rem; text-align: left; border-bottom: 1px solid #e2e8f0; vertical-align: middle; }
    .crud-table th { background: #f1f5f9; }
    .badge { background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }
    .btn-action { padding: 0.3rem 0.6rem; border-radius: 4px; border: none; font-size: 0.8rem; cursor: pointer; margin-right: 0.3rem; }
    .btn-action.edit { background: #fef08a; color: #854d0e; }
    .btn-action.delete { background: #fecaca; color: #991b1b; }
    .image-preview { margin-top: 0.5rem; }
    .image-preview img { max-height: 100px; border-radius: 6px; border: 1px solid #cbd5e1; object-fit: cover; }
    .table-thumb { width: 50px; height: 35px; border-radius: 4px; object-fit: cover; }
  `]
})
export class AdminNoticiasComponent implements OnInit {
  listaNoticias: Noticia[] = [];
  editando = false;
  private platformId = inject(PLATFORM_ID);

  formNoticia: Noticia = {
    id: 0,
    titulo: '',
    resumen: '',
    contenido: '',
    categoria: 'TECNOLOGÍA',
    imagenUrl: '',
    fecha: new Date().toISOString().split('T')[0],
    esDestacada: false
  };

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.noticiaService.noticias$.subscribe(data => {
        this.listaNoticias = data;
      });
    }
  }

  obtenerImagenPorDefecto(categoria: string): string {
    const catUpper = categoria?.toUpperCase() || '';
    if (catUpper === 'TECNOLOGÍA' || catUpper === 'TECNOLOGIA') {
      return 'https://armandosolier-create.github.io/informanews/informanews/img/fotoIA.jpg';
    } else if (catUpper === 'TURISMO') {
      return 'https://armandosolier-create.github.io/informanews/informanews/img/turismo1.jpg';
    } else if (catUpper === 'EDUCACIÓN' || catUpper === 'EDUCACION') {
      return 'https://armandosolier-create.github.io/informanews/informanews/img/herramientas.jpg';
    }
    return 'https://armandosolier-create.github.io/informanews/informanews/img/fotoIA.jpg';
  }

  guardar(): void {
    if (!this.formNoticia.titulo || !this.formNoticia.resumen) return;

    // Si el usuario no ingresó un enlace de imagen, le asignamos el enlace según la categoría
    if (!this.formNoticia.imagenUrl || this.formNoticia.imagenUrl.trim() === '') {
      this.formNoticia.imagenUrl = this.obtenerImagenPorDefecto(this.formNoticia.categoria);
    }

    if (this.editando) {
      this.noticiaService.actualizarNoticia(this.formNoticia);
    } else {
      this.noticiaService.crearNoticia(this.formNoticia);
    }
    this.limpiarFormulario();
  }

  cargarEdicion(item: Noticia): void {
    this.editando = true;
    this.formNoticia = { 
      ...item,
      imagenUrl: item.imagenUrl || ''
    };
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  eliminar(id: number): void {
    if (confirm('¿Seguro que deseas eliminar esta noticia?')) {
      this.noticiaService.eliminarNoticia(id);
    }
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.obtenerImagenPorDefecto(this.formNoticia.categoria);
  }

  private limpiarFormulario(): void {
    this.editando = false;
    this.formNoticia = {
      id: 0,
      titulo: '',
      resumen: '',
      contenido: '',
      categoria: 'TECNOLOGÍA',
      imagenUrl: '',
      fecha: new Date().toISOString().split('T')[0],
      esDestacada: false
    };
  }
}
