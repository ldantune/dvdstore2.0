import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelComponent } from './painel/painel.component';
import { EstadoComponent } from './estado/estado.component';


const routes: Routes = [
  { path:'home', component: PainelComponent},
  { path: 'estado', component: EstadoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
