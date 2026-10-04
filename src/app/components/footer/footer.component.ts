import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="container footer-content">
        <div class="footer-col">
          <h3 class="brand">INFORMANEWS</h3>
          <p>Información, experiencias y tendencias en un solo lugar.</p>
        </div>

        <div class="footer-col">
          <h4>Navegación</h4>
          <ul>
            <li><a routerLink="/">Inicio</a></li>
            <li><a routerLink="/noticias">Noticias</a></li>
            <li><a routerLink="/favoritos">Favoritos</a></li>
            <li><a routerLink="/contacto">Contacto</a></li>
            <li><a routerLink="/admin/noticias" class="admin-link">Gestión CRUD ⚙️</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Contacto</h4>
          <p class="contact-info">contacto&#64;informanews.com.co</p>
          <p class="contact-info">Bogotá, Colombia</p>
          <p class="copyright">&copy; 2026 Armando Obando</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #0b1120;
      color: #94a3b8;
      padding: 3.5rem 0 2.5rem 0;
      font-size: 0.9rem;
      border-top: 1px solid #1e293b;
    }
    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .brand {
      color: #ffffff;
      font-weight: 800;
      font-size: 1.2rem;
      letter-spacing: -0.5px;
      margin-bottom: 0.75rem;
    }
    .footer-col h4 {
      color: #ffffff;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    .footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .footer-col ul li {
      margin-bottom: 0.5rem;
    }
    .footer-col a {
      color: #94a3b8;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .footer-col a:hover {
      color: #38bdf8;
    }
    .admin-link {
      color: #38bdf8 !important;
      font-weight: 600;
    }
    .contact-info {
      margin-bottom: 0.4rem;
    }
    .copyright {
      margin-top: 1rem;
      font-size: 0.825rem;
      color: #64748b;
    }
  `]
})
export class FooterComponent {}
