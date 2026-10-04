import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from '../models/noticia.model';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private platformId = inject(PLATFORM_ID);

  // Datos iniciales por defecto con las imágenes asignadas
  private noticiasIniciales: Noticia[] = [
    {
      id: 1,
      titulo: 'La Inteligencia Artificial transforma la educación superior',
      resumen: 'Herramientas interactivas y modelos predictivos mejoran los métodos de enseñanza actuales.',
      contenido: 'La integración de la inteligencia artificial en el aula está marcando un hito en la educación contemporánea. Universidades de todo el mundo están adoptando tutores virtuales y análisis de aprendizaje para personalizar la enseñanza según el ritmo de cada estudiante.',
      categoria: 'TECNOLOGÍA',
      imagenUrl: 'https://armandosolier-create.github.io/informanews/informanews/img/fotoIA.jpg',
      fecha: '2026-10-01',
      esDestacada: true,
      tiempoLectura: '3 min de lectura'
    },
    {
      id: 2,
      titulo: 'Descubre los mejores destinos ecoturísticos de Colombia',
      resumen: 'Rutas sostenibles y parques naturales prometen experiencias inolvidables para viajeros.',
      contenido: 'El turismo sostenible continúa ganando terreno en Colombia. Desde el Parque Nacional Natural Tayrona hasta el Eje Cafetero, los viajeros buscan conectar con la naturaleza minimizando el impacto ambiental.',
      categoria: 'TURISMO',
      imagenUrl: 'https://armandosolier-create.github.io/informanews/informanews/img/turismo1.jpg',
      fecha: '2026-10-02',
      esDestacada: true,
      tiempoLectura: '4 min de lectura'
    },
    {
      id: 3,
      titulo: 'Nuevas plataformas digitales revolucionan las aulas de clases',
      resumen: 'Docentes incorporan soluciones tecnológicas para incentivar el trabajo colaborativo.',
      contenido: 'El uso de plataformas digitales interactiva permite a los estudiantes participar de manera dinámica en proyectos colaborativos, eliminando barreras geográficas y fomentando el aprendizaje cooperativo.',
      categoria: 'EDUCACIÓN',
      imagenUrl: 'https://armandosolier-create.github.io/informanews/informanews/img/herramientas.jpg',
      fecha: '2026-10-03',
      esDestacada: true,
      tiempoLectura: '2 min de lectura'
    }
  ];

  private noticiasSubject = new BehaviorSubject<Noticia[]>([]);
  public noticias$: Observable<Noticia[]> = this.noticiasSubject.asObservable();

  private favoritosSubject = new BehaviorSubject<number[]>([]);
  public favoritos$: Observable<number[]> = this.favoritosSubject.asObservable();

  constructor() {
    this.cargarDeLocalStorage();
  }

  // Asigna imagen por defecto según la categoría elegida
  public obtenerImagenPorDefecto(categoria: string): string {
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

  private cargarDeLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const noticiasGuardadas = localStorage.getItem('informanews_noticias');
      if (noticiasGuardadas) {
        this.noticiasSubject.next(JSON.parse(noticiasGuardadas));
      } else {
        this.noticiasSubject.next(this.noticiasIniciales);
        this.guardarNoticiasEnStorage(this.noticiasIniciales);
      }

      const favoritosGuardados = localStorage.getItem('informanews_favoritos');
      if (favoritosGuardados) {
        this.favoritosSubject.next(JSON.parse(favoritosGuardados));
      }
    } else {
      this.noticiasSubject.next(this.noticiasIniciales);
    }
  }

  private guardarNoticiasEnStorage(noticias: Noticia[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('informanews_noticias', JSON.stringify(noticias));
    }
  }

  private guardarFavoritosEnStorage(favs: number[]): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('informanews_favoritos', JSON.stringify(favs));
    }
  }

  getNoticias(): Noticia[] {
    return this.noticiasSubject.getValue();
  }

  getNoticiaById(id: number): Noticia | undefined {
    return this.getNoticias().find(n => n.id === id);
  }

  crearNoticia(noticia: Noticia): void {
    const noticias = this.getNoticias();
    
    // Si no tiene imagenUrl asignada o viene vacía, aplicar imagen por defecto según la categoría
    if (!noticia.imagenUrl || noticia.imagenUrl.trim() === '') {
      noticia.imagenUrl = this.obtenerImagenPorDefecto(noticia.categoria);
    }

    const nuevoId = noticias.length > 0 ? Math.max(...noticias.map(n => n.id)) + 1 : 1;
    const nuevaNoticia = { ...noticia, id: nuevoId };

    const actualizadas = [nuevaNoticia, ...noticias];
    this.noticiasSubject.next(actualizadas);
    this.guardarNoticiasEnStorage(actualizadas);
  }

  actualizarNoticia(noticia: Noticia): void {
    const noticias = this.getNoticias();
    if (!noticia.imagenUrl || noticia.imagenUrl.trim() === '') {
      noticia.imagenUrl = this.obtenerImagenPorDefecto(noticia.categoria);
    }

    const actualizadas = noticias.map(n => n.id === noticia.id ? noticia : n);
    this.noticiasSubject.next(actualizadas);
    this.guardarNoticiasEnStorage(actualizadas);
  }

  eliminarNoticia(id: number): void {
    const noticias = this.getNoticias().filter(n => n.id !== id);
    this.noticiasSubject.next(noticias);
    this.guardarNoticiasEnStorage(noticias);

    // Si la noticia eliminada estaba en favoritos, se remueve
    if (this.esFavorito(id)) {
      this.toggleFavorito(id);
    }
  }

  esFavorito(id: number): boolean {
    return this.favoritosSubject.getValue().includes(id);
  }

  toggleFavorito(id: number): void {
    const favsActuales = [...this.favoritosSubject.getValue()];
    const index = favsActuales.indexOf(id);

    if (index >= 0) {
      favsActuales.splice(index, 1);
    } else {
      favsActuales.push(id);
    }

    this.favoritosSubject.next(favsActuales);
    this.guardarFavoritosEnStorage(favsActuales);
  }
}
