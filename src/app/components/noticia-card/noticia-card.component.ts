import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card">
      <div class="card-image-wrapper">
        <img [src]="noticia.imagenUrl" [alt]="noticia.titulo" class="card-image" />
      </div>
      <div class="card-content">
        <span class="category-tag">{{ noticia.categoria }}</span>
        <h3 class="card-title">{{ noticia.titulo }}</h3>
        <p class="card-description">{{ noticia.resumen }}</p>
        
        <div class="card-footer">
          <a [routerLink]="['/noticia', noticia.id]" class="read-more">Ver más →</a>
          <button class="fav-btn" (click)="toggleFav()" [class.active]="esFavorito">
            {{ esFavorito ? '❤️' : '♡' }}
          </button>
        </div>

        <div class="crud-actions" *ngIf="mostrarGestion">
          <button class="btn-edit" (click)="edit.emit(noticia)">Editar</button>
          <button class="btn-delete" (click)="delete.emit(noticia.id)">Eliminar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card { background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #f0f0f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); display: flex; flex-direction: column; }
    .card-image { width: 100%; height: 180px; object-fit: cover; }
    .card-content { padding: 1.25rem; display: flex; flex-direction: column; flex-grow: 1; }
    .category-tag { font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase; margin-bottom: 0.5rem; }
    .card-title { font-size: 1.1rem; font-weight: 700; color: #111827; margin: 0 0 0.5rem 0; line-height: 1.3; }
    .card-description { font-size: 0.875rem; color: #6b7280; margin-bottom: 1.25rem; flex-grow: 1; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; }
    .read-more { color: #2563eb; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
    .fav-btn { background: none; border: none; font-size: 1.25rem; cursor: pointer; color: #ef4444; }
    .crud-actions { display: flex; gap: 0.5rem; margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #f3f4f6; }
    .btn-edit { background: #f3f4f6; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer; }
    .btn-delete { background: #fee2e2; color: #dc2626; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer; }
  `]
})
export class NoticiaCardComponent {
  @Input() noticia!: Noticia;
  @Input() mostrarGestion: boolean = false;
  @Output() edit = new EventEmitter<Noticia>();
  @Output() delete = new EventEmitter<number>();

  constructor(private noticiaService: NoticiaService) {}

  get esFavorito(): boolean {
    return this.noticiaService.esFavorito(this.noticia.id);
  }

  toggleFav(): void {
    this.noticiaService.toggleFavorito(this.noticia.id);
  }
}
