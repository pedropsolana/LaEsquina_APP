import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';
import { AuthService } from './../../services/auth.service';
import { IUser } from './../../interfaces/iuser';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Component({
  selector: 'app-datos-clientes',
  templateUrl: './datos-clientes.page.html',
  styleUrls: ['./datos-clientes.page.scss'],
})
export class DatosClientesPage implements OnInit {

  // @Output() back: EventEmitter<boolean>;
  // @Output() doCreateAccount: EventEmitter<boolean>;

  public user: IUser[];
  public usuario: string;
  public cliente = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    apellidos: new FormControl(''),
    telf: new FormControl(''),
    address: new FormControl(''),
    poblacion: new FormControl(''),
  });
  public id: string;


  constructor(
    public authService: AuthService,
    private toastService: ToastService,
    private userService: UserService
  ) {
    // this.back = new EventEmitter<boolean>();
    // this.doCreateAccount = new EventEmitter<boolean>();
  }

  ngOnInit() {
    this.obtieneDatos();
  }

  modificaDatos() {
    console.log(this.cliente.value);
    console.log(this.id);
    // Actualiza el objeto en Firebase
    this.userService.actualizaUser(this.id, this.cliente.value).then(
      (response) => {
        console.log("Hecho");
      }).catch((error) => {
        console.log(error);
      }
      );
  }

  obtieneDatos() {
    // Recojo el usuario actual
    this.authService.currentUser().then(user => {
      this.usuario = user.email;
      console.log("he llegado", this.usuario);

      // Recojo los datos del usuario y los pongo en el formulario
      this.userService.getCliente(this.usuario).snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ key: c.payload.key, ...c.payload.val() })
          )
        )
      ).subscribe(data => {
        this.user = data;
        this.cliente.controls.name.setValue(this.user[0].name);
        this.cliente.controls.email.setValue(this.user[0].email);
        this.cliente.controls.apellidos.setValue(this.user[0].apellidos);
        this.cliente.controls.address.setValue(this.user[0].address);
        this.cliente.controls.telf.setValue(this.user[0].telf);
        this.cliente.controls.poblacion.setValue(this.user[0].poblacion);
        this.id = this.user[0].key;
        console.log(this.user);
        console.log(this.user[0].key);
      });
    });
  }
}
