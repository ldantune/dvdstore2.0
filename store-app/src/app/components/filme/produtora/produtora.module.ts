import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoraRoutingModule } from './produtora-routing.module';
import { ProdutoraComponent } from './produtora.component';
import { ProdutoraFormComponent } from './produtora-form/produtora-form.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';


@NgModule({
  declarations: [ProdutoraComponent, ProdutoraFormComponent],
  entryComponents: [ ProdutoraFormComponent],
  imports: [
    ComumModule,
    ProdutoraRoutingModule
  ]
})
export class ProdutoraModule { }
