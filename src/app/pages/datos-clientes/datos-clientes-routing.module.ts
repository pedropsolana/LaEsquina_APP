import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosClientesPage } from './datos-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: DatosClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosClientesPageRoutingModule {}
