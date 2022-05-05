import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.page.html',
  styleUrls: ['./list-products.page.scss'],
})
export class ListProductsPage implements OnInit {

  // categoria de los productos
  private idCategory: number;
  // productos a mostrar
  public products: Product[];
  private loading: HTMLIonLoadingElement;

  constructor(
    private navParams: NavParams,
    private productService: ProductService,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {
    // recojo los id de la categoria
    this.idCategory = this.navParams.data.idCategory;
    console.log(this.idCategory);
    this.products = [];
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.presentLoading().then(() => { 
      // Recojo los productos
      this.productService.getProducts(this.idCategory).subscribe(results => {
        this.products = results;
        console.log(this.products);
        this.dismissLoading();
      }, error => {
        this.dismissLoading();
      })

    });

  }

  /**
   * Mostramos el loading
   */  
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...'
    });
    await this.loading.present();
  }

  /**
   * Quitamos el loading
   */
  async dismissLoading() {
    if (this.loading != null) {
      await this.loading.dismiss();
    }
  }

  /**
   * Vamos a un producto
   * @param p 
   */
  goToProduct(p: Product) {
    this.navParams.data.product = p;
    this.navCtrl.navigateForward('product');
  }

}
