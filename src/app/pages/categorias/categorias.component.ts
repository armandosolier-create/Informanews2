import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

interface CategoriaItem {
  nombre: string;
}

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, NoticiaCardComponent],
  template: `
    <div class="container section">
      <h2>Explore nuestras Categorías</h2>
      <p class="subtitle">Filtra y explora las publicaciones agrupadas por temas de tu interés.</p>

      <div class="categories-buttons">
        <button 
          *ngFor="let cat of categorias" 
          [class.active]="categoriaActiva === cat.nombre"
          (click)="seleccionarCategoria(cat.nombre)" 
          class="cat-button">
          
          <!-- Contenedor del ícono SVG directo en el template -->
          <div class="icon-container" [ngSwitch]="cat.nombre">
            
            <!-- Tecnología -->
            <svg *ngSwitchCase="'Tecnología'" viewBox="0 0 24 24">
              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
            </svg>

            <!-- Turismo -->
            <svg *ngSwitchCase="'Turismo'" viewBox="0 0 24 24">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>

            <!-- Educación -->
            <svg *ngSwitchCase="'Educación'" viewBox="0 0 24 24">
              <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
            </svg>

            <!-- Comercio -->
            <svg *ngSwitchCase="'Comercio'" viewBox="0 0 24 24">
              <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 6H6v-4h6v4z"/>
            </svg>

          </div>

          <span>{{ cat.nombre }}</span>
        </button>
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
    .subtitle { color: #64748b; margin-top: -0.5rem; margin-bottom: 2.5rem; }
    
    .categories-buttons { 
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 1.25rem; 
      margin-bottom: 2.5rem; 
    }
    
    .cat-button { 
      background: #ffffff; 
      border: 1px solid #e2e8f0; 
      padding: 1.5rem 1rem; 
      border-radius: 12px; 
      font-weight: 700; 
      cursor: pointer; 
      color: #0f172a; 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .cat-button:hover {
      border-color: #2563eb;
      transform: translateY(-2px);
    }

    .cat-button.active { 
      background: #2563eb; 
      color: white; 
      border-color: #2563eb; 
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }

    .icon-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-container svg {
      width: 28px;
      height: 28px;
      fill: #2563eb;
      transition: fill 0.2s ease-in-out;
    }

    .cat-button.active .icon-container svg {
      fill: #ffffff;
    }

    .grid-cards { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
      gap: 1.5rem; 
    }
  `]
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriaItem[] = [
    { nombre: 'Todas' },
    { nombre: 'Tecnología' },
    { nombre: 'Turismo' },
    { nombre: 'Educación' },
    { nombre: 'Comercio' }
  ];

  categoriaActiva = 'Todas';
  todasLasNoticias: Noticia[] = [];
  noticiasFiltradas: Noticia[] = [];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.noticias$.subscribe(noticias => {
      this.todasLasNoticias = noticias;
      this.seleccionarCategoria(this.categoriaActiva);
    });
  }

  seleccionarCategoria(catNombre: string): void {
    this.categoriaActiva = catNombre;
    if (catNombre === 'Todas') {
      this.noticiasFiltradas = this.todasLasNoticias;
    } else {
      this.noticiasFiltradas = this.todasLasNoticias.filter(
        n => n.categoria.toLowerCase() === catNombre.toLowerCase()
      );
    }
  }
}
