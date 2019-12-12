import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoraComponent } from './produtora/produtora.component';
import { DiretorComponent } from './diretor/diretor.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AtorComponent } from './ator/ator.component';
import { LinguagemComponent } from './linguagem/linguagem.component';
import { FilmeComponent } from './filme/filme.component';
import { AtorFilmeComponent } from './ator-filme/ator-filme.component';


const routes: Routes = [
  { path: 'ator', component: AtorComponent},
  { path: 'atorfilme', component: AtorFilmeComponent},
  { path:'categoria', component: CategoriaComponent},
  { path: 'diretor', component: DiretorComponent},
  { path: 'filme', component: FilmeComponent},
  { path: 'linguagem', component: LinguagemComponent},
  { path: 'produtora', component: ProdutoraComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmeRoutingModule { }
