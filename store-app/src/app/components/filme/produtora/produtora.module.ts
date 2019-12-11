import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoraRoutingModule } from './produtora-routing.module';
import { ProdutoraComponent } from './produtora.component';
import { ProdutoraFormComponent } from './produtora-form/produtora-form.component';


@NgModule({
  declarations: [ProdutoraComponent, ProdutoraFormComponent],
  imports: [
    CommonModule,
    ProdutoraRoutingModule
  ]
})
export class ProdutoraModule { }
