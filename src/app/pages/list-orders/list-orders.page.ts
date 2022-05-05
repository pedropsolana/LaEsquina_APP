import { ListordersService } from './../../services/listorders.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../interfaces/ipedidos';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.page.html',
  styleUrls: ['./list-orders.page.scss'],
})
export class ListOrdersPage implements OnInit {

  public showNewAccount: boolean;
  public pedidos: Pedidos[] = [];
  public usuario: string;

  constructor(
    public authService: AuthService,
    public listorderservice: ListordersService,
  ) {
    this.showNewAccount = false;
  }

  ngOnInit() {
    this.recogerOrdersporUsuario();
  }

  recogerOrdersporUsuario() {

    // Recojo el usuario actual
    this.authService.currentUser().then(user => {
      this.usuario = user.email;
      console.log("he llegado", this.usuario);
      
      // Recojo los productos
      this.listorderservice.getOrdersUser(this.usuario).subscribe(results => {
        this.pedidos = results;
        console.log(this.pedidos);
      }, error => {
        console.log("Error");
      })
    });
  }


  /**
   * Muestra el formulario de nueva cuenta
   */
  newAccount() {
    this.showNewAccount = true;
  }

  /**
   * Oculta el formulario de nueva cuenta
   */
  back() {
    this.showNewAccount = false;
  }

  pruebas(){
    console.log("Hola");
  }

}
