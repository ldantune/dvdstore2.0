import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoraComponent } from './produtora/produtora.component';
import { DiretorComponent } from './diretor/diretor.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AtorComponent } from './ator/ator.component';
import { LinguagemComponent } from './linguagem/linguagem.component';


const routes: Routes = [
  { path: 'ator', component: AtorComponent},
  { path:'categoria', component: CategoriaComponent},
  { path: 'diretor', component: DiretorComponent},
  { path: 'linguagem', component: LinguagemComponent},
  { path: 'produtora', component: ProdutoraComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmeRoutingModule { }
