import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Destino, LiDestino } from '../intefaces/intervaces';
import { map, pluck } from 'rxjs/operators';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  public notificarDest = new EventEmitter<LiDestino>();

  // destinos: LiDestino[] = [];

  apiKey = environment.apiKey;

  constructor( private http: HttpClient ) {
   }

  getLatLng( form: Destino ) {

    const numero = form.numero;
    const direccion = form.direccion.split(',');
    const calle = direccion[0];
    const ciudad = ( direccion[1] ) ? direccion[1] : 'Madrid';

    return this.http.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${numero}+${calle}+${ciudad},+Madird+View,+CA&key=${this.apiKey}`)
        .pipe(
          pluck( 'results' ),
          map( resp => resp[0] ),
          map( (item: any) => {
            const destino = {
              direccion: item.formatted_address,
              numero: item.address_components[0].long_name,
              calle: item.address_components[1].long_name,
              ciudad: item.address_components[2].long_name,
              lat: item.geometry.location.lat,
              lng: item.geometry.location.lng,
              id: item.place_id,
              infoWindow: true,
              opacidad: 1
            };
            this.notificarDest.emit( destino );
          } ),
         );

  }
}
