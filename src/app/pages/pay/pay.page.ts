import { ToastService } from './../../services/toast.service';
import { UserService } from './../../services/user.service';
import { OrderService } from './../../services/order.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
// import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
// import { PayPal, PayPalConfiguration, PayPalPayment } from '@ionic-native/paypal/ngx';

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
    private userService: UserService,
    private toastService: ToastService,
    //private paypal: PayPal,
    // private stripe: Stripe
  ) {
    this.showNewAccount = false;
  }

  ngOnInit() {
  }

  /**
   * Crea una orden en Firebase
   */
  createOrder() {
    this.orderService.createOrder().then(data => {
      console.log("Se ha creado el objeto ", data);
      // Limpia la orden
      this.orderService.clearOrder();
      this.toastService.showToast('Pedido Finalizado')
    }).catch(e => {
      console.error("Ha habido un error " + e)
      this.toastService.showToast('Error en el pago')
    })
  }

  payAndsend(){
    this.toastService.showToast('Pago realizado');
  }

  // payStripe() {
  //   this.stripe.setPublishableKey('pk_test_51KnmepAKpYXXcHeLLo56uBLT9JA2djd0ldxbcsCzYtsm3YO5cmmOGwFmGXG34nCPsXsQZdZ9nU3UKAgIY0MP82ky00mk5ubjAO');
  //   let card = {
  //     number: '4242424242424242',
  //     expMonth: 12,
  //     expYear: 2020,
  //     cvc: '220'
  //   }
  //   this.stripe.createCardToken(card)
  //     .then(token => {
  //       console.log(token.id);
  //     })
  //     .catch(error => console.error(error));
  // }

  // payPal() {
  //   this.toastService.showToast('Pago realizado');
  //   // Cambiar los ids de sandbox y live por los vuestros
  //   this.paypal.init({
  //     PayPalEnvironmentProduction: 'AcY7JVsgK8xCv0FSGCdFBcDIQO76BBQ7l7pxKZo_HwgopXbVbm13f9YqaW-3LNYh06tSTO6CgEPMlB6R',
  //     PayPalEnvironmentSandbox: 'ASl2PjsqBtFEZGpkOZQaOA8_in12Mw4Svon7BgiQcVU5281Tyx7ltXHZCix8XRcibebkQLF5pxHDX4XK'
  //   }).then(() => {
  //     // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
  //     this.paypal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
  //       // Only needed if you get an "Internal Service Error" after PayPal login!
  //       //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
  //     })).then(() => {
  //       let payment = new PayPalPayment(this.orderService.totalOrder(), 'EUR', 'LaEsquina', 'sale');
  //       this.paypal.renderSinglePaymentUI(payment).then(() => {

  //         this.authService.currentUser().then(user => {
  //           this.userService.getAddressUser(user.email).subscribe((users) => {
  //             console.log(users[0].name);
  //             this.orderService.order.name = users[0].name + ' ' + users[0].apellidos;
  //             this.orderService.order.telf = users[0].telf;
  //             this.orderService.order.email = users[0].email;
  //             this.createOrder();
  //           })
  //         })

  //       }, () => {
  //         // Error or render dialog closed without being successful
  //         this.toastService.showToast('Ha petado el cuadro de diálogo');
  //       });
  //     }, () => {
  //       // Error in configuration
  //       this.toastService.showToast('Ha petado la configuración');
  //     });
  //   }, () => {
  //     // Error in initialization, maybe PayPal isn't supported or something else
  //     this.toastService.showToast('Ha petado la inicialización o el dispositivo no permite usar PayPal');
  //   });

  // }

  aceptarYenviar() {
    this.authService.currentUser().then(user => {
      this.userService.getAddressUser(user.email).subscribe((users) => {
        console.log(users[0].name);
        this.orderService.order.name = users[0].name + ' ' + users[0].apellidos;
        this.orderService.order.telf = users[0].telf;
        this.orderService.order.email = users[0].email;
        this.createOrder();
      })
    })

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
