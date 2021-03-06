import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  /**
   * Mostrar toast
   * @param message 
   * @param duration 
   */
  async showToast(message, duration = 1000) {
    const toast = await this.toastController.create({
      message,
      duration,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

}
