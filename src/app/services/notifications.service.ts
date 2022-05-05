import { Injectable } from '@angular/core';
import {ActionPerformed, PushNotificationSchema, PushNotifications, Token,} from '@capacitor/push-notifications';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  public token: string = '';
  items: Observable<any[]>;

  constructor() { }

  PushNotif() {
      // Solicitar permiso para usar notificaciones push
     // iOS preguntará al usuario y regresará si concedió permiso o no
     // Android simplemente otorgará sin preguntar
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
       PushNotifications.register();
      } else {
        // Mostrar error
      }
    });

    // En caso de éxito, deberíamos poder recibir notificaciones y guardamos el token
    PushNotifications.addListener('registration',
      (token: Token) => {
        //alert('Notificacion Push, token: ' + token.value);
        this.token = token.value;
      }
    );

    // Mostrar error si hay algun problema
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Mostrar Notificacion cuando la APP esté abierta
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
       // alert('AVISO: ' + JSON.stringify(notification));
       alert('AVISO' + notification['body']);
      }
    );

    // Método llamado al tocar una notificación
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        //alert('AVISO: ' + JSON.stringify(notification));
        alert('AVISO: Revise su pedido')
      }
    );
    return this.token;
  }

}




