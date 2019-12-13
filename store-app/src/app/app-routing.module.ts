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
  { path: 'filme', loadChildren: () => import('./components/filme/filme.module').then(m => m.FilmeModule), canActivate: [AuthGuardService]},
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService]},
  { path: 'cliente', loadChildren: () => import('./components/cliente/cliente.module').then(m => m.ClienteModule), canActivate: [AuthGuardService]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
