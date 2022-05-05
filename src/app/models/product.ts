import { IProduct } from './../interfaces/iproduct';
import { set, get, forEach } from 'lodash-es';

export class Product implements IProduct {

    constructor(data) {
        set(this, 'data', data);
    }

    get price() {
        return get(this, 'data.price');
    }

    get name() {
        return get(this, 'data.name');
    }

    get img() {
        return get(this, 'data.img');
    }

    get idCategory() {
        return get(this, 'data.idCategory');
    }

    get showDetail() {
        return get(this, 'data.showDetail');
    }

    set showDetail(value: boolean) {
        set(this, 'data.showDetail', value);
    }

    get quantity() {
        return get(this, 'data.quantity');
    }

    set quantity(value: number) {
        set(this, 'data.quantity', value);
    }



    /**
     * Total del producto
     */
    totalPrice() {

        let total = this.price;
        return total;
    }

}
