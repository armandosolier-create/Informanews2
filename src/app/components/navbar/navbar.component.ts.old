import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NoticiaService } from '../../services/noticia.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="navbar-header">
      <div class="container navbar-container">
        <a routerLink="/" class="logo">INFORMANEWS</a>
        
        <nav class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="active">Noticias</a>
          <a routerLink="/categorias" routerLinkActive="active">Categorías</a>
          <a routerLink="/favoritos" routerLinkActive="active" class="fav-link">
            Favoritos ❤️ <span class="badge">{{ totalFavoritos }}</span>
          </a>
          <a routerLink="/admin/noticias" routerLinkActive="active" class="admin-badge">⚙️ Admin</a>
          <a routerLink="/contacto" routerLinkActive="active">Contacto</a>
        </nav>

        <a routerLink="/noticias" class="btn-primary">Explorar noticias</a>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header { background: #ffffff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 100; }
    .navbar-container { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; max-width: 1200px; margin: 0 auto; }
    .logo { font-size: 1.25rem; font-weight: 800; color: #2563eb; text-decoration: none; letter-spacing: -0.5px; }
    .nav-links { display: flex; gap: 1.5rem; align-items: center; }
    .nav-links a { text-decoration: none; color: #4b5563; font-weight: 500; font-size: 0.95rem; }
    .nav-links a.active { color: #111827; font-weight: 700; }
    .badge { background: #2563eb; color: #fff; border-radius: 50%; padding: 0.1rem 0.45rem; font-size: 0.75rem; }
    .btn-primary { background: #2563eb; color: #fff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
  `]
})
export class NavbarComponent implements OnInit {
  totalFavoritos = 0;
  private platformId = inject(PLATFORM_ID);

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.noticiaService.favoritos$?.subscribe(favs => {
        this.totalFavoritos = favs ? favs.length : 0;
      });
    }
  }
}
