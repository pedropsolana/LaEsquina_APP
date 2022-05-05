import { OrderService } from './../../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-product-order',
  templateUrl: './list-product-order.component.html',
  styleUrls: ['./list-product-order.component.css']
})
export class ListProductOrderComponent implements OnInit {

  constructor(
    public orderService: OrderService
  ) { }

  ngOnInit() {
  }

  /**
   * Muestra el detalle producto
   * @param product 
   */
   showDetail(product) {
    product.showDetail = !product.showDetail;
  }

  /**
   * Elimina el producto de la orden
   * @param product  
   */
  remove(product){
    this.orderService.order.removeProduct(product);
  }

}
