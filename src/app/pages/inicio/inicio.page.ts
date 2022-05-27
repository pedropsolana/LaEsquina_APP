import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotificationsService } from '../../services/notifications.service';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Swiper, Autoplay } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  public config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: true,
    autoplay:{
      delay: 2500,
      disableOnInteraction: false
    },
    // centeredSlides: true,
    pagination: { clickable: true },
    };

  onSwiper([swiper]) {
    console.log(Swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  openPreview(img){
    console.log(img);
  };

  constructor(
    private db: AngularFirestore,
    public notificaciones: NotificationsService
  ) { }

  ngOnInit() {
    console.log('Initializing HomePage');
    this.notificaciones.PushNotif();
  }
}
