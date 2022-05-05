import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Pedidos } from './../interfaces/ipedidos';

@Injectable({
  providedIn: 'root'
})
export class ListordersService {

  constructor(
    private afd: AngularFireDatabase,
  ) { }

    //Obtener todos los pedidos
    getOrdersUser(usuario: string){
      console.log("Aqui esta: "+usuario);
      return this.afd.list<Pedidos>('orders', ref => ref.orderByChild('email').equalTo(usuario)).valueChanges();
     }
}
