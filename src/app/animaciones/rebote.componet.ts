import { animation, style, animate, keyframes } from '@angular/animations';


export const rebote = animation([
    animate('.4s', keyframes([
        style({ transform: 'scaleX(1)', offset: 0}),
        style({ border: '1px solid red',
                 offset: 0.05}),
        style({ transform: 'translateX(0px)',
                 offset: 0.16}),
        style({ transform: 'translateX(-10px)',
                offset: 0.32}),
        style({ transform: 'translateX(9px)',
                offset: 0.48}),
        style({ transform: 'translateX(-6px)',
                offset: 0.64}),
        style({ transform: 'translateX(4px)',
                offset: 0.8}),
        style({ transform: 'translateX(-2px)',
                offset: 0.95}),
        style({ border: '1px solid black',
                offset: 1})
      ])),
]);
