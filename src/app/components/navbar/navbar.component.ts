import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, Renderer2 } from '@angular/core';
import { timer } from 'rxjs';
import { Destino } from '../../intefaces/intervaces';
import { NgForm } from '@angular/forms';
import { GeocodingService } from '../../services/geocoding.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('direccion', {static: false}) direccion: ElementRef;
  @Output() newDestino = new EventEmitter();

  sinDirecc = false;
  delay = timer(450);
  btnSpinner = false;


  destino: Destino = {
    direccion: '',
    numero: null
  };

  constructor( private renderer: Renderer2,
               private destinoService: GeocodingService ) { }

  ngOnInit() {
  }

  BuscarDestino( forma: NgForm ) {

    if ( !forma.touched ) {
      this.sinDirecc = true;

      this.renderer.addClass( this.direccion.nativeElement, 'rebote' );
      this.delay.subscribe( () => this.renderer.removeClass( this.direccion.nativeElement, 'rebote' ));
    }
    if ( forma.invalid ) { return; }

    this.btnSpinner = true;

    this.destinoService.getLatLng( forma.value )
      .subscribe( (resp: any) => {
        this.btnSpinner = false;
        this.destino.numero = null;
      } );
  }

  validarDirec() {
    if ( this.destino.direccion.length > 1 ) {
      this.sinDirecc = false;

    }
  }
  limpiarInput() {
    this.destino.direccion = '';
  }
}
