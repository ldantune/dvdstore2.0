import { NgModule } from '@angular/core';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';


@NgModule({
  declarations: [ClienteComponent, ClienteFormComponent],
  entryComponents: [ ClienteFormComponent],
  imports: [
    ComumModule,
    ClienteRoutingModule
  ]
})
export class ClienteModule { }
