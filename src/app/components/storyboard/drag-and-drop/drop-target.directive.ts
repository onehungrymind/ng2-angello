import { Directive, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropTarget]'
})
export class DropTargetDirective implements OnInit{
  ngOnInit() {}
}
