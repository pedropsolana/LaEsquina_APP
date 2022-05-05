import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Order } from './../models/order';
import { Injectable } from '@angular/core';
import { NotificationsService } from './notifications.service';
import * as moment from 'moment';

import { forEach, product } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _order: Order;

  constructor(
    private afd: AngularFireDatabase,
    public notificacion:NotificationsService,
  ) {
    this.clearOrder();
  }

  get order() {
    return this._order; 
  }

  /**
   * Devuelve el numero de productos
   */
  numProducts() {
    return this._order.numProducts();
  }

  /**
   * Total de la orden
   */
  totalOrder() {
    return this._order.totalOrder();
  }

  /**
   * Limpia el orden
   */
  clearOrder() {
    this._order = new Order({});
  }

  /**
   * Parsea la orden para Firebase
   */
  convertOrder() {

    const finalOrder = {
      "products": [],
      "date": moment().format('DD-MM-YYYY'),
      "time": moment().format('HH:mm'),
      "email": this._order.email,
      "name": this._order.name,
      "telf": this._order.telf,
      "priceOrder": this.totalOrder(),
      "estado": '1',
      "token": this.notificacion.token
    }

    // Añadimos productos
     forEach(this._order.productsOrder, product => {
       const finalProduct = {
         "name": product.name,
         "priceFinal": product.totalPrice() * product.quantity,
         "quantity": product.quantity
       }
       finalOrder.products.push(finalProduct);
     })
    console.log(finalOrder);
    console.log(this.notificacion.token);
    return finalOrder;

  }

  /**
   * Crea la orden
   */
  createOrder(){
    return this.afd.list('orders').push(this.convertOrder()); 
  }



} 
