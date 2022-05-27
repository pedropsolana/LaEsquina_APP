import { ListordersService } from './../../services/listorders.service';
import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../../interfaces/ipedidos';
import { map } from 'rxjs/operators';
import { IUser } from './../../interfaces/iuser';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.page.html',
  styleUrls: ['./list-orders.page.scss'],
})
export class ListOrdersPage implements OnInit {

  public showNewAccount: boolean;
  public pedidos: Pedidos[] = [];
  public user: IUser[];
  public usuario: string;
  public nombreyapellidos: string;

  constructor(
    public authService: AuthService,
    private userService: UserService,
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
      
      // Recojo los datos del usuario
       this.userService.getCliente(this.usuario).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.user = data;
        this.nombreyapellidos=this.user[0].name +" "+this.user[0].apellidos;       
      });
      
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
