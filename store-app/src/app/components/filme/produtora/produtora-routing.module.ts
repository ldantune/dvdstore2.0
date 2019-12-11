import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoraComponent } from './produtora.component';


const routes: Routes = [
  { path: '', component: ProdutoraComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoraRoutingModule { }
