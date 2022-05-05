import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public showInfoUser: boolean; 
  public showNewAccount: boolean;
  public showOrder: boolean;
  public usuario: string;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public authService: AuthService,
    private menuController: MenuController,
    public orderService: OrderService
  ) {
    this.showInfoUser = false;
    this.showNewAccount = false;
    this.showOrder = false;
  }

  ngOnInit() {
 
  }

  /**
   * Muestra el volver atras
   */
  showBackButton() {
    let urlNoButton = [
      '/categories',
      '/pay'
    ] 
    // Compruebo la ruta actual, si estoy en esa ruta, no pongo el boton para volver atras
    if (urlNoButton.find(url => url === this.router.url)) {
      return false;
    }
    return true;
  }

  /**
   * Volvemos atras
   */
  goBack() {
    this.navCtrl.back();
  }

  /**
   * Mostramos el panel de usuario
   */
  showPanelUser() {
    this.showInfoUser = true;
  }

  /**
   * Logout del usuario
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Mostramos el panel inicial
   */
   back() {
    this.showInfoUser = false;
    this.showNewAccount = false;
    this.showOrder = false;
  }

  /**
   * Mostrar el formulario de creacion de cuenta
   */
  newAccount() {
    this.showNewAccount = true;
  }

  /**
   * Mostramos el login
   */
  showLogin() {
    this.showNewAccount = false;
  }

  /**
   * Mostramos el panel de la orden
   */
  showPanelOrder(){
    this.showOrder = true;
  }

  /**
   * Vamos a la pagina del pago
   */
  goToPay(){

    this.back();

    // reseteamos el detalle
    this.orderService.order.productsOrder.forEach(p => p.showDetail = false);

    // Cerramos el menu
    this.menuController.close('content');
    this.navCtrl.navigateForward('pay')
  }
  async openMenu() {
    this.showPanelOrder();
    await this.menuController.open('content');
    
  }

  goToListOrders(){

    this.back(); 

    // reseteamos el detalle
    //this.orderService.order.productsOrder.forEach(p => p.showDetail = false);

    // Cerramos el menu
    this.menuController.close('content');
    this.navCtrl.navigateForward('list-orders')
  }

}
