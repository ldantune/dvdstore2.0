import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';


@NgModule({
  declarations: [CategoriaComponent, CategoriaFormComponent],
  entryComponents: [CategoriaFormComponent],
  imports: [
    ComumModule,
    CommonModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
