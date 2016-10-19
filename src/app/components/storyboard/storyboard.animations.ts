import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

const animationTransition = transition('detailsHidden <=> detailsShown', animate('500ms ease-out'));

export const listAreaAnimation = trigger('listAreaState', [
  state('detailsHidden', style({
    right: '36px'
  })),
  state('detailsShown', style({
    right: '250px'
  })),
  animationTransition
]);

export const detailAreaAnimation = trigger('detailAreaState', [
  state('detailsHidden', style({
    transform: 'translateX(200px)',
    background: 'transparent'
  })),
  state('detailsShown', style({
    transform: 'translateX(0)',
    background: '#eee'
  })),
  animationTransition
]);

export const detailContentAnimation = trigger('detailContentState', [
  state('detailsHidden', style({
    opacity: '0'
  })),
  state('detailsShown', style({
    opacity: '1'
  })),
  animationTransition
]);
