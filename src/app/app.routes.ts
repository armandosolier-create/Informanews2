import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { DetalleNoticiaComponent } from './pages/detalle-noticia/detalle-noticia.component';
import { AdminNoticiasComponent } from './pages/admin-noticias/admin-noticias.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'noticia/:id', component: DetalleNoticiaComponent },
  { path: 'admin/noticias', component: AdminNoticiasComponent },
  { path: '**', redirectTo: '' }
];
