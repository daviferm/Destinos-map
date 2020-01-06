import { Component, OnInit } from '@angular/core';
import { LiDestino } from '../../intefaces/intervaces';
import { GeocodingService } from '../../services/geocoding.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material';
import { ModalComponent } from '../../components/modal/modal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  Destinos: LiDestino[] = [];
  verMapa = false;
  centroLat: number;
  centroLng: number;

  constructor( public destinoService: GeocodingService,
               private snackBar: MatSnackBar,
               private bottomSheet: MatBottomSheet ) {
    this.comprobarLocalStorage();
  }

  ngOnInit() {
    this.destinoService.notificarDest.subscribe( resp => {
      this.Destinos.push( resp );
      this.guardarLocalStorage();
    } );
  }

  comprobarLocalStorage() {
    if ( localStorage.getItem( 'dest' ) ) {
      this.Destinos = JSON.parse( localStorage.getItem( 'dest' ) );
    }
  }
  guardarLocalStorage() {
    localStorage.setItem( 'dest', JSON.stringify( this.Destinos ) );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'cerrar', {
      duration: 2000
    });
  }



  mostrarMapa() {
    if ( this.Destinos.length > 0 ) {

      this.centroLat = this.Destinos[0].lat;
      this.centroLng = this.Destinos[0].lng;
      this.verMapa = true;
    }
  }
  cerrarMapa( event: boolean ) {
    if ( event ) {
      this.verMapa = false;
    }
  }

  borrarItems( idx: number ) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Se eliminará (${this.Destinos[idx].calle} ${this.Destinos[idx].numero}) de la Lista!`,
      icon: 'info',
      showConfirmButton: true,
      showCancelButton: true
    }).then( borrar => {

      if ( borrar.value ) {

        this.Destinos.splice( idx, 1 );
        this.guardarLocalStorage();
        this.openSnackBar('Destino eliminado!');

      }
    } );
  }

  borrarLista() {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Se borrarán todos los destinos de la lista!',
      icon: 'info',
      showConfirmButton: true,
      showCancelButton: true
    }).then( borrar => {

      if ( borrar.value ) {

        this.Destinos = [];
        localStorage.setItem( 'dest', JSON.stringify( this.Destinos ) );

      }
    } );
  }
  openBottomSheet(): void {
    this.bottomSheet.open(ModalComponent);
  }

}
