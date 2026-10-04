import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NoticiaCardComponent],
  template: `
    <section class="hero-section">
      <div class="container hero-card">
        <span class="badge-tag">INFORMACIÓN QUE TE CONECTA</span>
        <h1>Noticias que importan.</h1>
        <p>Explora noticias y experiencias educativas, tecnológicas, turísticas y comerciales.</p>
        <div class="hero-buttons">
          <a routerLink="/noticias" class="btn-primary">Explorar noticias</a>
          <a routerLink="/contacto" class="btn-secondary">Contáctanos</a>
        </div>
      </div>
    </section>

    <section class="container section">
      <h2>Noticias destacadas</h2>
      <p class="subtitle">Las historias más relevantes de hoy</p>

      <div class="grid-cards">
        <app-noticia-card 
          *ngFor="let noticia of noticiasDestacadas" 
          [noticia]="noticia">
        </app-noticia-card>
      </div>
    </section>

    <section class="container section">
      <div class="category-banner">
        <h2>Explora nuestras categorías</h2>
        <p>Encuentra contenido según tus intereses.</p>
        <div class="category-links">
          <a routerLink="/categorias" class="cat-link">EDUCACIÓN</a>
          <a routerLink="/categorias" class="cat-link">TECNOLOGÍA</a>
          <a routerLink="/categorias" class="cat-link">TURISMO</a>
          <a routerLink="/categorias" class="cat-link">COMERCIO</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .section { margin: 3rem auto; }
    .hero-section { padding: 2rem 1rem; }
    .hero-card { background: #1e293b; color: white; padding: 3rem 2rem; border-radius: 16px; }
    .badge-tag { color: #60a5fa; font-size: 0.8rem; font-weight: 700; letter-spacing: 1px; }
    .hero-card h1 { font-size: 2.5rem; margin: 0.5rem 0 1rem 0; font-weight: 800; }
    .hero-card p { font-size: 1.1rem; color: #cbd5e1; margin-bottom: 2rem; }
    .hero-buttons { display: flex; gap: 1rem; }
    .btn-primary { background: #2563eb; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .btn-secondary { background: white; color: #1e293b; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .subtitle { color: #64748b; margin-top: -0.5rem; margin-bottom: 2rem; }
    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .category-banner { background: #eff6ff; padding: 2.5rem; border-radius: 16px; }
    .category-links { display: flex; gap: 1.5rem; margin-top: 1.5rem; flex-wrap: wrap; }
    .cat-link { color: #2563eb; font-weight: 700; text-decoration: none; font-size: 0.9rem; }
  `]
})
export class HomeComponent implements OnInit {
  noticiasDestacadas: Noticia[] = [];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.noticias$.subscribe(noticias => {
      this.noticiasDestacadas = noticias.filter(n => n.esDestacada);
    });
  }
}
