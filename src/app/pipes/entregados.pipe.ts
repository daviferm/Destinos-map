import { Pipe, PipeTransform } from '@angular/core';
import { LiDestino } from '../intefaces/intervaces';

@Pipe({
  name: 'entregados',
  pure: false
})
export class EntregadosPipe implements PipeTransform {

  transform(value: LiDestino[]): number {

    const entregados = value.filter( el => el.opacidad === 0.5 );
    return entregados.length;
  }

}
