import { trigger, transition, style,query, animateChild, animate, group } from '@angular/animations';
export const scaleanim = trigger('routeAnimations',[
  transition('home <=> accedi',[
    query(':enter, :leave',[
      style({
        position:'absolute',
        left:0,
        width: '100%',
        transform: 'scale(0,0)',
      }),
    ], {optional: true}),
    query(':enter',[
      animate('700ms ease',
      style({
        transform: 'scale(1,1)',
      }),
    ),
  ],{optional: true} ),
]),
transition('home <=> registrati',[
  query(':enter, :leave',[
    style({
      position:'absolute',
      left:0,
      width: '100%',
      transform: 'scale(0,0)',
    }),
  ], {optional: true}),
  query(':enter',[
    animate('700ms ease',
    style({
      transform: 'scale(1,1)',
    }),
  ),
],{optional: true} ),
]),
transition('logout => home',[
  query(':enter, :leave',[
    style({
      position:'absolute',
      left:0,
      width: '100%',
      transform: 'scale(0,0)',
    }),
  ], {optional: true}),
  query(':enter',[
    animate('700ms ease',
    style({
      transform: 'scale(1,1)',

    }),
  ),


],{optional: true} ),




]),


]);
