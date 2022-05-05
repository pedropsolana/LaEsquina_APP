import { product } from 'lodash-es';
import { ToastService } from './../../services/toast.service';

import { OrderService } from './../../services/order.service';
import { Product } from './../../models/product';
import { NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  public product: Product; 
  public cantidad: number = 1;

  constructor(
    private navParams: NavParams,
    private orderService: OrderService,
    private toastService: ToastService,
    
    private navCtrl: NavController 
  ) {
    this.product = this.navParams.data.product;
    console.log(this.product);
  }

  ngOnInit() {
  }

  addProductOrder() { 

    // obtengo el producto
    const product: Product = new Product(this.product);

    // añado el producto
    this.orderService.order.addProduct(product, this.cantidad);
    console.log(this.orderService.order);
    
    // Muestro un mensaje
    this.toastService.showToast('Producto añadido');

    // Volvemos al inicio
    this.navCtrl.navigateRoot('/categories');  

  }

  sumaCantidad(){
    this.cantidad = this.cantidad + 1;
  }

  restaCantidad(){
    if (this.cantidad>0){
      this.cantidad = this.cantidad - 1;
    }
    
  }
}
