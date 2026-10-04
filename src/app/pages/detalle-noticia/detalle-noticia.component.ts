import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container section" *ngIf="noticia">
      <a routerLink="/noticias" class="back-link">← Volver a noticias</a>
      
      <span class="category-tag">{{ noticia.categoria }}</span>
      <h1 class="title">{{ noticia.titulo }}</h1>
      <p class="meta">{{ fechaFormateada }} • {{ tiempoLecturaFormateado }}</p>

      <div class="image-wrapper">
        <img [src]="noticia.imagenUrl" [alt]="noticia.titulo" class="detail-image" />
      </div>

      <div class="detail-grid">
        <div class="content">
          <p class="lead-text">{{ noticia.resumen }}</p>
          <p class="body-text">{{ noticia.contenido }}</p>
        </div>

        <div class="sidebar-actions">
          <button class="btn-fav" (click)="toggleFav()" [class.is-fav]="esFavorito">
            {{ esFavorito ? '❤️ En favoritos' : '♡ Agregar a favoritos' }}
          </button>
          <a routerLink="/contacto" class="btn-contact">Contactar</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 900px; margin: 0 auto; padding: 0 1rem; }
    .section { margin: 2rem auto; }
    .back-link { color: #2563eb; text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 1.5rem; }
    .category-tag { font-size: 0.8rem; font-weight: 700; color: #2563eb; text-transform: uppercase; display: block; }
    .title { font-size: 2.25rem; font-weight: 800; color: #0f172a; margin: 0.5rem 0; line-height: 1.2; }
    .meta { color: #64748b; font-size: 0.875rem; margin-bottom: 1.5rem; }
    .image-wrapper { width: 100%; height: 380px; border-radius: 12px; overflow: hidden; margin-bottom: 2rem; }
    .detail-image { width: 100%; height: 100%; object-fit: cover; }
    .detail-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; }
    .lead-text { font-size: 1.1rem; font-weight: 600; color: #334155; margin-bottom: 1rem; }
    .body-text { color: #475569; line-height: 1.6; white-space: pre-line; }
    .sidebar-actions { display: flex; flex-direction: column; gap: 1rem; }
    .btn-fav { background: #2563eb; color: white; border: none; padding: 0.8rem; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .btn-fav.is-fav { background: #dc2626; }
    .btn-contact { text-align: center; border: 1px solid #cbd5e1; padding: 0.8rem; border-radius: 8px; font-weight: 600; text-decoration: none; color: #0f172a; }
  `]
})
export class DetalleNoticiaComponent implements OnInit {
  noticia?: Noticia;

  constructor(
    private route: ActivatedRoute,
    private noticiaService: NoticiaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noticia = this.noticiaService.getNoticiaById(id);
    }
  }

  get fechaFormateada(): string {
    const rawFecha = this.noticia?.fecha || this.noticia?.fechaPublicacion;
    
    if (!rawFecha) {
      return 'Publicado el ' + new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(rawFecha)) {
      const [year, month, day] = rawFecha.split('-').map(Number);
      const fechaUtc = new Date(Date.UTC(year, month - 1, day));
      const fechaTexto = fechaUtc.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      });
      return `Publicado el ${fechaTexto}`;
    }

    return rawFecha.toLowerCase().startsWith('publicado') 
      ? rawFecha 
      : `Publicado el ${rawFecha}`;
  }

  get tiempoLecturaFormateado(): string {
    if (this.noticia?.tiempoLectura) {
      return this.noticia.tiempoLectura;
    }

    const textoCompleto = `${this.noticia?.resumen || ''} ${this.noticia?.contenido || ''}`;
    const cantidadPalabras = textoCompleto.trim().split(/\s+/).filter(p => p.length > 0).length;
    const minutos = Math.max(1, Math.ceil(cantidadPalabras / 200));

    return `${minutos} min de lectura`;
  }

  get esFavorito(): boolean {
    return this.noticia ? this.noticiaService.esFavorito(this.noticia.id) : false;
  }

  toggleFav(): void {
    if (this.noticia) {
      this.noticiaService.toggleFavorito(this.noticia.id);
    }
  }
}
