import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { timer } from 'rxjs';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateX(80px) rotate(360deg)',
        opacity: .8
      })),
      state('closed', style({
        transform: 'translateX(0px)  rotate(0deg)',
        opacity: 1
      })),
      transition('open => closed', [
        animate( 300 )
      ]),
      transition('closed => open', [
        animate('.4s')
      ])
    ]),
    trigger('closeOpen', [
      state('open', style({
        transform: 'translateX(-80px) rotate(-360deg)',
        opacity: .8
      })),
      state('closed', style({
        transform: 'translateX(0px)  rotate(0deg)',
        opacity: 1
      })),
      transition('open => closed', [
        animate( 200 )
      ]),
      transition('closed => open', [
        animate('.4s')
      ])
    ]),

  ]
})
export class ModalComponent implements OnInit {

  moveWhatsapp = true;
  delay = timer(1);

  constructor( private bottomSheetRef: MatBottomSheetRef<ModalComponent> ) {
  }

  ngOnInit() {
    this.delay.subscribe( () => this.moveWhatsapp = false );
  }


  openLink(event: MouseEvent): void {
    // Evento cuando se pulsa el modal
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  cerrarModar() {

    this.bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Modal cerrado.');
      this.moveWhatsapp = true;
    });

    this.bottomSheetRef.dismiss();

  }

}
