import { NgModule } from '@angular/core';


import { AdminRoutingModule } from './admin-routing.module';
import { PainelComponent } from './painel/painel.component';
import { EstadoComponent } from './estado/estado.component';
import { EstadoFormComponent } from './estado/estado-form/estado-form.component';
import { ComumModule } from 'src/app/modules/comum/comum.module';



@NgModule({
  declarations: [PainelComponent, EstadoComponent, EstadoFormComponent],
  entryComponents: [ EstadoFormComponent],
  imports: [
    ComumModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
