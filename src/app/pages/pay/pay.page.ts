import { ToastService } from './../../services/toast.service';
import { UserService } from './../../services/user.service';
//import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';
import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.page.html',
  styleUrls: ['./pay.page.scss'],
})
export class PayPage implements OnInit {

  public showNewAccount: boolean;

  constructor(
    public authService: AuthService,
    public orderService: OrderService,
    //private paypal: PayPal,
    private userService: UserService,
    private toastService: ToastService,
  ) {
    this.showNewAccount = false;
  }

  ngOnInit() {
  }
  
  /**
   * Crea una orden en Firebase
   */
  createOrder() {
    this.orderService.createOrder().then( data => {
      console.log("Se ha creado el objeto ", data);
      // Limpia la orden
      this.orderService.clearOrder();
      this.toastService.showToast('Pago Realizado')
    }).catch(e => {
      console.error("Ha habido un error " + e)
      this.toastService.showToast('Error en el pago')
    })
  }

  payAndsend() {

    // // Cambiar los ids de sandbox y live por los vuestros
    // this.paypal.init({
    //   PayPalEnvironmentProduction: 'AWJGGDAX8oVY_RCVjW46bkZUx6KdOeYpfH5UwIBoX3KMwu7aC4mJ1X4fDpGJnWFeiXaXaLxyAMbCD9_n',
    //   PayPalEnvironmentSandbox: 'AYbzLA9xPLpOVIRhGFD-s_lqSQfcPAVgKHVPXkG6J5753HOXSjzdeEVaw8o8pXfgJVpCwQxsirPKNgki'
    // }).then(() => {
    //   // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
    //   this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
    //     // Only needed if you get an "Internal Service Error" after PayPal login!
    //     //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
    //   })).then(() => {
    //     let payment = new PayPalPayment(this.orderService.totalOrder(), 'EUR', 'Burguer queen', 'sale');
    //     this.paypal.renderSinglePaymentUI(payment).then(() => {

          this.authService.currentUser().then(user => {
            this.userService.getAddressUser(user.email).subscribe((users) => {
              console.log(users[0].name);
              this.orderService.order.name = users[0].name +' '+ users[0].apellidos; 
              this.orderService.order.telf = users[0].telf;
              this.orderService.order.email = users[0].email;
              this.createOrder(); 
            })
          })

    //     }, () => {
    //       // Error or render dialog closed without being successful
    //     });
    //   }, () => {
    //     // Error in configuration
    //   });
    // }, () => { 
    //   // Error in initialization, maybe PayPal isn't supported or something else
    // });

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

}
