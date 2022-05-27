import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'list-products',
    loadChildren: () => import('./pages/list-products/list-products.module').then( m => m.ListProductsPageModule)
  },
  {
    path: 'pay',
    loadChildren: () => import('./pages/pay/pay.module').then( m => m.PayPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./pages/product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'list-orders',
    loadChildren: () => import('./pages/list-orders/list-orders.module').then( m => m.ListOrdersPageModule)
  },
  {
    path: 'localizacion',
    loadChildren: () => import('./pages/localizacion/localizacion.module').then( m => m.LocalizacionPageModule)
  },
  {
    path: 'datos-clientes',
    loadChildren: () => import('./pages/datos-clientes/datos-clientes.module').then( m => m.DatosClientesPageModule)
  },
  {
    path: 'info-app',
    loadChildren: () => import('./pages/info-app/info-app.module').then( m => m.InfoAppPageModule)
  },
   
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
