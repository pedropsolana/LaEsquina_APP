import { IProduct } from './../interfaces/iproduct';
import { ICategory } from './../interfaces/icategory';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private afd: AngularFireDatabase
  ) { }

  /**
   * Obtener los productos de una categoria
   * @param idCategory 
   */
  getProducts(idCategory: number) {
    return this.afd.list<IProduct>('products', ref => ref.orderByChild('idCategory').equalTo(idCategory)).valueChanges();
  }

  /**
   * Obtener las categorias
   */
  getCategories() {
    return this.afd.list<ICategory>('categories').valueChanges();
  }

}
