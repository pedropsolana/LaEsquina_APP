import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosClientesPageRoutingModule } from './datos-clientes-routing.module';

import { DatosClientesPage } from './datos-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    DatosClientesPageRoutingModule
  ],
  declarations: [DatosClientesPage]
})
export class DatosClientesPageModule {}
