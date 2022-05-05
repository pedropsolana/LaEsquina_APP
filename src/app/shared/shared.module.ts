import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductOrderComponent } from './list-product-order/list-product-order.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    FooterComponent,
    ToolbarComponent,
    LoginComponent,
    CreateAccountComponent,
    ListProductOrderComponent
  ],
  exports: [
    FooterComponent,
    ToolbarComponent,
    LoginComponent,
    CreateAccountComponent,
    ListProductOrderComponent
  ]
})
export class SharedModule { }
