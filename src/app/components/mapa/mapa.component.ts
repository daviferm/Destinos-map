import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';
import { LiDestino } from '../../intefaces/intervaces';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateY(40px)',
        opacity: .8
      })),
      state('closed', style({
        transform: 'translateY(0px)',
        opacity: 1
      })),
      transition('open => closed', [
        animate( 200 )
      ]),
      transition('closed => open', [
        animate('.1s')
      ])
    ]),
  ]
})
export class MapaComponent implements OnInit {


  @Output() closedMapa = new EventEmitter();
  @Output() borrarItem = new EventEmitter();
  @Input() Items: LiDestino[] = [];
  @Input() zoom = 15;
  infoMarker: LiDestino;
  @Input() icono = 'assets/img/icono.png';
  imgPosition = 'assets/img/punto-azul.png';
  centro: {lat: number, lng: number};
  location: {lat: number, lng: number};
  gps = false;

  @Input() latitud;
  @Input() longitud;
  isOpen = true;
  delay = timer(10);

  constructor() {
    setInterval( () => {
      this.getUserLocation();
      setTimeout(() => this.gps = false, 920);
    }, 1000);
   }

  ngOnInit() {
    this.delay.subscribe( () => this.isOpen = false );
  }

  cerrarMapa() {
    this.closedMapa.emit( true );
  }


  clickMarker( marcador: LiDestino, marker: any) {

     // Si hay un infoWindow abierto
     if (this.infoMarker) {
      // Cerramos el infoWindo abierto
      this.infoMarker.infoWindow = false;
      this.delay.subscribe( () => {
        this.infoMarker.infoWindow = true;

        this.infoMarker = marcador;
      } );
    } else {
      this.infoMarker = marcador;
    }
  }

  cerrarInfoWindow() {
    // Si hay un infoWindow abierto
    if (this.infoMarker) {
      // Cerramos el infoWindo abierto
      this.infoMarker.infoWindow = false;
      this.delay.subscribe( () => {
        this.infoMarker.infoWindow = true;
      } );
    }
  }
  comoLlegar( lat, lng ) {

    window.open(`https://maps.google.com/?q=${lat},${lng}`);

  }
  tarea( marcador: LiDestino, idx: number ) {

    if (marcador.opacidad === 0.5) {
      marcador.opacidad = 1;
    } else {
      marcador.opacidad = 0.5;
    }

    localStorage.setItem( 'dest', JSON.stringify( this.Items ) );
  }

  borrarDestino( idx: number ) {

    this.borrarItem.emit( idx );

  }

  getUserLocation() {

    // Mostrar mi posición GPS
    if (navigator.geolocation) {

     navigator.geolocation.getCurrentPosition((position) => {

          this.location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.gps = true;
        });

     } else {
      Swal.fire({
        title: 'GPS',
        text: 'Debes activar la localización GPS par amostrar tu posición!',
        icon: 'info',
        showConfirmButton: true
      })
      // this.openSnackBar('Activa la localización.');
     }
  }



}
