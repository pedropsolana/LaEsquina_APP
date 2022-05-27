import { IUser } from './../interfaces/iuser';
import { set, get } from 'lodash-es';

export class User implements IUser {

    constructor(data) {
        set(this, 'data', data);
    }
    key: string;
    $key: string;

    getData(){
        return get(this, 'data');
    }

    get apellidos(): string{
        return get(this, 'data.apellidos')
    };

    set apellidos(value: string){
        set(this, 'data.apellidos', value)
    }; 

    get email(): string {
        return get(this, 'data.email'); 
    }

    set email(value: string) {
        set(this, 'data.email', value);
    }

    get password(): string {
        return get(this, 'data.password');
    }

    set password(value: string) {
        set(this, 'data.password', value);
    }
  
    get telf(): string {
        return get(this, 'data.telf');
    }

    set telf(value: string) {
        set(this, 'data.telf', value);
    }

    get name(): string {
        return get(this, 'data.name');
    }

    set name(value: string) {
        set(this, 'data.name', value);
    }

    get address(): string {
        return get(this, 'data.address');
    }

    set address(value: string) {
        set(this, 'data.address', value);
    }

    get poblacion(): string {
        return get(this, 'data.poblacion');
    }

    set poblacion(value: string) {
        set(this, 'data.poblacion', value);
    }

}
