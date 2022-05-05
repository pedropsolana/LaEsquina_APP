import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})
export class LocalizacionPage implements OnInit {
  map = null;
  markers: Marker[] = [
    {
      position: {
        lat: 38.72649744160241,
        lng: -6.537944166300709,
      },
      title: 'Café Bar La Esquina'
    },
  ];

  constructor() { }

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    // Crear un nuevo mapa pasando HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // Crear Longitud y Latitud
    const myLatLng = {lat: 38.72649744160241, lng: -6.537944166300709};
    
    // Crear Mapa
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });

    // Crear Ventana Info
    const contentString = 
      "<div><b>Café Bar La Esquina</b></div>" +
      "<div>C/ Constitución, 1</div>"+
      "<div>06209 Solana de los Barros (Badajoz)</div>"+
      "<div>Telf: 555555555</div>";
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
    });
  
    // Crear Marcador
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.map,
      title: "La Esquina",
    });

     google.maps.event.addListenerOnce(this.map, 'idle', () => {
       mapEle.classList.add('show-map');
       infowindow.open({anchor: marker, map: this.map, shouldFocus: false, });
     });
   }
}
