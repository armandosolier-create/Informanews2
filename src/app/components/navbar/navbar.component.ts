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
        
        <!-- Botón Hamburguesa (solo visible en dispositivos móviles) -->
        <button class="hamburger-btn" (click)="toggleMenu()" aria-label="Abrir menú">
          <span [class.open]="menuAbierto"></span>
          <span [class.open]="menuAbierto"></span>
          <span [class.open]="menuAbierto"></span>
        </button>

        <!-- Contenedor de enlaces con clase dinámica para abrir/cerrar -->
        <div class="nav-wrapper" [class.is-open]="menuAbierto">
          <nav class="nav-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="cerrarMenu()">Inicio</a>
            <a routerLink="/noticias" routerLinkActive="active" (click)="cerrarMenu()">Noticias</a>
            <a routerLink="/categorias" routerLinkActive="active" (click)="cerrarMenu()">Categorías</a>
            <a routerLink="/favoritos" routerLinkActive="active" class="fav-link" (click)="cerrarMenu()">
              Favoritos ❤️ <span class="badge">{{ totalFavoritos }}</span>
            </a>
            <a routerLink="/admin/noticias" routerLinkActive="active" class="admin-badge" (click)="cerrarMenu()">⚙️ Admin</a>
            <a routerLink="/contacto" routerLinkActive="active" (click)="cerrarMenu()">Contacto</a>
          </nav>

          <a routerLink="/noticias" class="btn-primary" (click)="cerrarMenu()">Explorar noticias</a>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .navbar-header { background: #ffffff; border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 100; }
    .navbar-container { display: flex; align-items: center; justify-content: space-between; padding: 1rem 2rem; max-width: 1200px; margin: 0 auto; position: relative; }
    .logo { font-size: 1.25rem; font-weight: 800; color: #2563eb; text-decoration: none; letter-spacing: -0.5px; z-index: 101; }
    
    .nav-wrapper { display: flex; align-items: center; gap: 2rem; }
    .nav-links { display: flex; gap: 1.5rem; align-items: center; }
    .nav-links a { text-decoration: none; color: #4b5563; font-weight: 500; font-size: 0.95rem; transition: color 0.2s; }
    .nav-links a.active { color: #111827; font-weight: 700; }
    
    .badge { background: #2563eb; color: #fff; border-radius: 50%; padding: 0.1rem 0.45rem; font-size: 0.75rem; }
    .btn-primary { background: #2563eb; color: #fff; padding: 0.6rem 1.2rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.9rem; text-align: center; }

    /* Botón Hamburguesa (Oculto en PC) */
    .hamburger-btn { display: none; flex-direction: column; justify-content: space-between; width: 26px; height: 18px; background: transparent; border: none; cursor: pointer; padding: 0; z-index: 101; }
    .hamburger-btn span { width: 100%; height: 2px; background-color: #111827; transition: all 0.3s ease; }
    
    /* Animación del botón hamburguesa cuando el menú está abierto */
    .hamburger-btn span.open:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger-btn span.open:nth-child(2) { opacity: 0; }
    .hamburger-btn span.open:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    /* --- Adaptación Responsive para Móviles y Tablets (pantallas < 868px) --- */
    @media (max-width: 868px) {
      .hamburger-btn { display: flex; }

      .nav-wrapper {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #ffffff;
        flex-direction: column;
        align-items: stretch;
        padding: 1.5rem;
        gap: 1.5rem;
        border-bottom: 1px solid #e5e7eb;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: none; /* Oculto por defecto en móvil */
      }

      .nav-wrapper.is-open {
        display: flex; /* Se despliega al pulsar el botón */
      }

      .nav-links {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .nav-links a {
        width: 100%;
        font-size: 1.05rem;
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  totalFavoritos = 0;
  menuAbierto = false; // Estado para controlar si el menú desplegable está abierto
  private platformId = inject(PLATFORM_ID);

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.noticiaService.favoritos$?.subscribe(favs => {
        this.totalFavoritos = favs ? favs.length : 0;
      });
    }
  }

  // Alternar el menú abierto/cerrado
  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  // Cerrar menú al hacer clic en un enlace
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
