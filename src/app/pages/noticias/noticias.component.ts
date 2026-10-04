import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, NoticiaCardComponent],
  template: `
    <div class="container section">
      <div class="header-actions">
        <div>
          <h2>Últimas noticias</h2>
          <p class="subtitle">Explora información de actualidad por categoría.</p>
        </div>
      </div>

      <div class="filter-bar">
        <input 
          type="text" 
          [(ngModel)]="busqueda" 
          (ngModelChange)="filtrarNoticias()" 
          placeholder="Buscar noticias..." 
          class="search-input" 
        />
        <select [(ngModel)]="categoriaSeleccionada" (ngModelChange)="filtrarNoticias()" class="select-category">
          <option value="">Todas las categorías</option>
          <option value="TECNOLOGÍA">Tecnología</option>
          <option value="TURISMO">Turismo</option>
          <option value="EDUCACIÓN">Educación</option>
          <option value="COMERCIO">Comercio</option>
        </select>
      </div>

      <div class="grid-cards">
        <app-noticia-card 
          *ngFor="let noticia of noticiasFiltradas" 
          [noticia]="noticia">
        </app-noticia-card>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .section { margin: 2rem auto; }
    .header-actions { margin-bottom: 1.5rem; }
    .subtitle { color: #64748b; margin-top: -0.5rem; }
    .filter-bar { display: flex; gap: 1rem; margin: 1.5rem 0; }
    .search-input { flex-grow: 1; padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; }
    .select-category { padding: 0.75rem 1rem; border: 1px solid #cbd5e1; border-radius: 8px; }
    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
  `]
})
export class NoticiasComponent implements OnInit {
  todasLasNoticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = '';

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.noticias$.subscribe(noticias => {
      this.todasLasNoticias = noticias;
      this.filtrarNoticias();
    });
  }

  filtrarNoticias(): void {
    this.noticiasFiltradas = this.todasLasNoticias.filter(n => {
      const coincideBusqueda = n.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) || 
                                n.resumen.toLowerCase().includes(this.busqueda.toLowerCase());
      const coincideCategoria = this.categoriaSeleccionada === '' || n.categoria === this.categoriaSeleccionada;
      return coincideBusqueda && coincideCategoria;
    });
  }
}
