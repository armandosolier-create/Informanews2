import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../services/noticia.service';
import { Noticia } from '../../models/noticia.model';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, NoticiaCardComponent],
  template: `
    <div class="container section">
      <h2>Tus Noticias Favoritas</h2>
      <p class="subtitle">Aquí encontrarás todas las noticias que has guardado.</p>

      <div *ngIf="noticiasFavoritas.length === 0" class="empty-state">
        <p>No tienes noticias guardadas en tus favoritos.</p>
      </div>

      <div class="grid-cards" *ngIf="noticiasFavoritas.length > 0">
        <app-noticia-card 
          *ngFor="let noticia of noticiasFavoritas" 
          [noticia]="noticia">
        </app-noticia-card>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
    .section { margin: 2rem auto; }
    .subtitle { color: #64748b; margin-top: -0.5rem; margin-bottom: 2rem; }
    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; }
    .empty-state { text-align: center; padding: 3rem; background: #f8fafc; border-radius: 12px; color: #64748b; }
  `]
})
export class FavoritosComponent implements OnInit {
  noticiasFavoritas: Noticia[] = [];

  constructor(private noticiaService: NoticiaService) {}

  ngOnInit(): void {
    this.noticiaService.favoritos$.subscribe(favIds => {
      const noticias = this.noticiaService.getNoticias();
      this.noticiasFavoritas = noticias.filter(n => favIds.includes(n.id));
    });
  }
}
