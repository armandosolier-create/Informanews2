export interface Noticia {
  id: number;
  titulo: string;
  resumen: string;
  contenido: string;
  categoria: string;
  fecha?: string;
  fechaPublicacion?: string;
  tiempoLectura?: string;
  esDestacada?: boolean;
  imagenUrl?: string;
}
