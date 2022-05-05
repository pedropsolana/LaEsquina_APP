import { Product } from './../models/product';
export interface IOrder {
    productsOrder: Product[],
    name: string,
    telf: string,
    email: string,
    estado: string,
    addProduct,
    oneMoreProduct,
    oneLessProduct,
    removeProduct,
    numProducts,
    totalOrder   
}
