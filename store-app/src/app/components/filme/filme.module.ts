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


@NgModule({
  declarations: [CategoriaComponent, CategoriaFormComponent,ProdutoraComponent, ProdutoraFormComponent, DiretorComponent, DiretorFormComponent, AtorComponent, AtorFormComponent],
  entryComponents: [ CategoriaFormComponent, ProdutoraFormComponent, DiretorFormComponent, AtorFormComponent],
  imports: [
    ComumModule,
    FilmeRoutingModule
  ]
})
export class FilmeModule { }
