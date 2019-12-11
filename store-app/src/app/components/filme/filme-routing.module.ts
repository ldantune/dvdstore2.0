import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoraComponent } from './produtora/produtora.component';
import { DiretorComponent } from './diretor/diretor.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AtorComponent } from './ator/ator.component';


const routes: Routes = [
  { path: 'ator', component: AtorComponent},
  { path:'categoria', component: CategoriaComponent},
  { path: 'diretor', component: DiretorComponent},
  { path: 'produtora', component: ProdutoraComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmeRoutingModule { }
