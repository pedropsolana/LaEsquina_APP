import { UserService } from './../../services/user.service';
import { ToastService } from './../../services/toast.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit { 

  @Output() back: EventEmitter<boolean>;
  @Output() doCreateAccount: EventEmitter<boolean>;

  public user: User;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private userService: UserService
  ) {
    this.user = new User({});
    this.back = new EventEmitter<boolean>();
    this.doCreateAccount = new EventEmitter<boolean>(); 
  }

  ngOnInit() {
  }

  /**
   * Crear la cuenta
   */
  createAccount() { 
    // Le pasamos el email y el password
    this.authService.createAccount(this.user.email, this.user.password).then((result) => {
      console.log(result);
      // Añado el usuario para la direccion
      this.userService.addUser(this.user); 
      // Indico que se ha creado la cuenta
      this.doCreateAccount.emit(true);
      this.toastService.showToast('Creada con exito');
    }).catch(error => {
      this.toastService.showToast('Error al crear la cuenta');
    })
  }
  
  /**
   * Indico que he salido
   */
  exit() {
    this.back.emit(true);
  }

}
