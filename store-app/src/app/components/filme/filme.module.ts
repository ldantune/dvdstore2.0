import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmeRoutingModule } from './filme-routing.module';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { ProdutoraComponent } from './produtora/produtora.component';
import { ProdutoraFormComponent } from './produtora/produtora-form/produtora-form.component';
import { DiretorComponent } from './diretor/diretor.component';
import { DiretorFormComponent } from './diretor/diretor-form/diretor-form.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { AtorComponent } from './ator/ator.component';
import { AtorFormComponent } from './ator/ator-form/ator-form.component';
import { LinguagemComponent } from './linguagem/linguagem.component';
import { LinguagemFormComponent } from './linguagem/linguagem-form/linguagem-form.component';
import { FilmeComponent } from './filme/filme.component';
import { FilmeFormComponent } from './filme/filme-form/filme-form.component';


@NgModule({
  declarations: [CategoriaComponent, CategoriaFormComponent,ProdutoraComponent, ProdutoraFormComponent, DiretorComponent, DiretorFormComponent, AtorComponent, 
    AtorFormComponent, LinguagemComponent, LinguagemFormComponent, FilmeComponent, FilmeFormComponent],
  entryComponents: [ CategoriaFormComponent, ProdutoraFormComponent, DiretorFormComponent, AtorFormComponent, LinguagemFormComponent, FilmeFormComponent],
  imports: [
    ComumModule,
    FilmeRoutingModule
  ]
})
export class FilmeModule { }
