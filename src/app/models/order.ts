import { Product } from './product';
import { IOrder } from './../interfaces/iorder';

import { set, get, find, cloneDeep, unset, isEqual, remove, forEach } from 'lodash-es';

export class Order implements IOrder {

    constructor(data) {
        set(this, 'data', data);
        this.productsOrder = [];
    }

    get productsOrder(): Product[] {
        return get(this, 'data.productsOrder');
    }

    set productsOrder(value: Product[]) {
        set(this, 'data.productsOrder', value);
    }
    get estado(): string {
        return get(this, 'data.estado');
    }

    set estado(value: string) {
        set(this, 'data.estado', value);
    }

    get name(): string {
        return get(this, 'data.name');
    }

    set name(value: string) {
        set(this, 'data.name', value);
    }

    get telf(): string {
        return get(this, 'data.telf');
    }

    set telf(value: string) {
        set(this, 'data.telf', value);
    }

    get email(): string {
        return get(this, 'data.email');
    }

    set email(value: string) {
        set(this, 'data.email', value); 
    }

    addProduct(product: Product, cantidad: number) {

        console.log("product ", product);
        const productFound: Product = find(this.productsOrder, p => {
            let copy = cloneDeep(p);
            unset(copy, 'data.quantity');
            unset (copy, 'data.showDetail');
            return isEqual(copy, product);
        })

        if (productFound) {
            productFound.quantity = productFound.quantity + cantidad;
        } else {
            product.quantity = cantidad;
            this.productsOrder.push(product);
        }
    }


    oneMoreProduct(product: Product) {
        product.quantity++;
    }

    oneLessProduct(product: Product) {
        product.quantity--;
        if (product.quantity == 0) {
            this.removeProduct(product);
        }
    }

    removeProduct(product: Product) {
        remove(this.productsOrder, p => {
            return isEqual(p, product);
        })
    }

    numProducts() {
        return this.productsOrder.length;
    }

    totalOrder() {

        let total = 0;

        forEach(this.productsOrder, p => {
            total += p.totalPrice() * p.quantity
        })

        return total.toFixed(2);
    }


}
