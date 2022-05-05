import { ToastService } from './../../services/toast.service';
import { AuthService } from './../../services/auth.service';
import { User } from './../../models/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() showBack: boolean = true;

  @Output() newAccount: EventEmitter<boolean>;
  @Output() back: EventEmitter<boolean>;
  @Output() doLogin: EventEmitter<boolean>;

  public user: User;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.newAccount = new EventEmitter<boolean>();
    this.back = new EventEmitter<boolean>();
    this.doLogin = new EventEmitter<boolean>();
    this.user = new User({});
  }

  ngOnInit() {

  }

  login() {
    this.authService.login(this.user.email, this.user.password).then((result) => {
      console.log(result);
      this.toastService.showToast('Sesión Iniciada');
      this.doLogin.emit(true);
    }).catch(error => {
      console.log(error);
      this.toastService.showToast('Error al autenticarse')
    })
  }

  /**
   * Indico que hemos creado la cuenta
   */
   showNewAccount() {
    this.newAccount.emit(true);
  }

  /**
   * Indico que vuelvo hacia atras
   */
  exit() {
    this.back.emit(true);
  }


}
