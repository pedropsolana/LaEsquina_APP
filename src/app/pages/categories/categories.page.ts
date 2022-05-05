import { Category } from './../../models/category';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  // Categorias
  public categories: Category[];
  // loading
  private loading: HTMLIonLoadingElement;

  constructor(
    private productService: ProductService,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private navController: NavController
  ) {
    this.categories = [];
  }

  ngOnInit() {

    this.loadData();
  }

  /**
   * Carga los datos
   */
  loadData() {

    this.presentLoading();

    this.productService.getCategories().subscribe(results => {
      this.categories = results;
      console.log(this.categories);
      this.dismissLoading();
    }, error => {
      console.error(error);
      this.dismissLoading();
    })

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
   * Vemos los productos de una categoria
   * @param id 
   */
  goToProducts(id: number) {
    this.navParams.data.idCategory = id;
    this.navController.navigateForward('list-products');
  }

}
