import { Directive, OnInit, Input, ElementRef, Output, OnDestroy, EventEmitter } from '@angular/core';
import { DropContainerDirective } from "./drop-container.directive";

@Directive({
  selector: '[appDropTarget]'
})
export class DropTargetDirective implements OnInit, OnDestroy {
  @Input() appDropTarget;
  @Output() onDragEnter = new EventEmitter;
  @Output() onDragOver = new EventEmitter;
  @Output() onDragLeave = new EventEmitter;
  @Output() onDrop = new EventEmitter;
  destroy: any;
  el = $(this.element.nativeElement);

  constructor(
    private element: ElementRef,
    private dropContainer: DropContainerDirective
  ) {}

  ngOnInit() {
    var anchor = this.appDropTarget || 'center';

    this.destroy = this.dropContainer.removeDropTarget.bind(this.dropContainer, anchor);

    this.el.addClass('drop-target drop-target-' + anchor);

    this.dropContainer.addDropTarget(anchor, this);
  }

  ngOnDestroy() {
    this.destroy();
  }

  handleDragEnter(eventData) {
    // console.log('this.handleDragEnter', eventData);

    this.el.addClass('drop-target-active');

    if (this.onDragEnter) {
      this.onDragEnter.emit(eventData);
    }
  };

  handleDragOver(eventData) {
    // console.log('this.handleDragOver', eventData);

    if (this.onDragOver) {
      this.onDragOver.emit(eventData);
    }
  };

  handleDragLeave(eventData) {
    // console.log('this.handleDragLeave', eventData);

    this.el.removeClass('drop-target-active');

    if (this.onDragLeave) {
      this.onDragLeave.emit(eventData);
    }
  };

  handleDrop(eventData) {
    // console.log('this.handleDrop', eventData);

    if (this.onDrop) {
      this.onDrop.emit(eventData);
    }
  };
}
