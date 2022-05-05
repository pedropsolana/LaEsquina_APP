import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from '../models/user';
import { unset } from 'lodash-es';

@Injectable({
  providedIn: 'root' 
})
export class UserService {

  constructor(
    private afd: AngularFireDatabase
  ) { }

  /**
   * Añade un usuario
   * @param user 
   */
  addUser(user: User) {
    // Elimina el passwword
    unset(user, 'data.password');
    this.afd.list('users').push(user.getData()); 
  }

  /**
   * Obtiene la direccion del usuario
   * @param email 
   */
  getAddressUser(email: string) {
    return this.afd.list<User>('users', ref => ref.orderByChild('email').equalTo(email)).valueChanges();
  }

}
