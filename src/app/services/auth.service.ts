import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Indica si esta o no logueado
  private _isLoggued: boolean;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this._isLoggued = false; 

    // Comprueba si estoy ya logueado
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this._isLoggued = true;
      }
    })
  }

  get isLogged() {
    return this._isLoggued;
  }

  set isLogged(value: boolean) {
    this._isLoggued = value;
  }

  /**
   * Realiza el login a la aplicacion
   * @param email 
   * @param pass 
   */
  login(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  /**
   * Logout de nuestra aplicación
   */
  logout() {
    this.afAuth.signOut();
    this._isLoggued = false; 
  }

  /**
   * Devuelve el usuario actual
   */
  currentUser(){
    if(this.afAuth.currentUser){
      return this.afAuth.currentUser;
    }
    return null; 
  }

  /**
   * Crea una cuenta 
   * @param email 
   * @param pass 
   */
  createAccount(email: string, pass: string) {

    return this.afAuth.isSignInWithEmailLink(email).then(result => {
      if (result) {
        // El usuario existe
        return new Promise((resolve, reject) => {
          reject('User exists');
        })
      } else {
        // Crea la cuenta
        return this.afAuth.createUserWithEmailAndPassword(email, pass).then(auth => {
          return auth;
        }).catch(error => {
          throw error;
        })
      }
    })

  }

}
