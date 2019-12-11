import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/public/login/login.component';
import { CadastroUsuarioComponent } from './components/public/cadastro-usuario/cadastro-usuario.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component:CadastroUsuarioComponent},
  { path: 'admin/home', loadChildren: () => import('./components/admin/painel/painel.module').then(m => m.PainelModule), canActivate: [AuthGuardService]},
  { path: 'filme/categoria', loadChildren: () => import('./components/filme/categoria/categoria.module').then(m => m.CategoriaModule), canActivate: [AuthGuardService]},
  { path: 'filme/diretor', loadChildren: () => import('./components/filme/diretor/diretor.module').then(m => m.DiretorModule), canActivate: [AuthGuardService]},
  { path: 'filme/produtora', loadChildren: () => import('./components/filme/produtora/produtora.module').then(m => m.ProdutoraModule), canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
