import { NgModule } from '@angular/core';


import { DiretorRoutingModule } from './diretor-routing.module';
import { DiretorComponent } from './diretor.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';
import { DiretorFormComponent } from './diretor-form/diretor-form.component';


@NgModule({
  declarations: [DiretorComponent, DiretorFormComponent],
  entryComponents: [DiretorFormComponent],
  imports: [
    ComumModule,
    DiretorRoutingModule
  ]
})
export class DiretorModule { }
