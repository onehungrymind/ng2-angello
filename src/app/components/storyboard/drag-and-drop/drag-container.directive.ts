import { Directive, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import { DraggingService } from './dragging.service';

@Directive({
  selector: '[appDragContainer]'
})
export class DragContainerDirective implements OnInit, OnChanges{
  @Input() appDragContainer;
  @Input() mimeType;

  dragging: boolean;
  data: any;
  type: any;
  el: JQuery = $(this.element.nativeElement);

  constructor(
    private draggingService: DraggingService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.el.on('dragstart', this.handleDragStart.bind(this));
    this.el.on('dragend ', this.handleDragEnd.bind(this));

    this.el.attr('draggable', 'true');
  }

  ngOnChanges(changes) {
    this.updateDragData(changes.appDragContainer.currentValue);
    this.updateDragType(changes.mimeType.currentValue);
  }

  handleDragStart(e) {
    if (e.originalEvent) e = e.originalEvent;

    e.dataTransfer.dropEffect = 'move';
    e.dataTransfer.effectAllowed = 'move';

    this.el.addClass('drag-container-active');
    this.dragging = true;

    this.draggingService.setData(this.data);
    this.draggingService.setType(this.type);
  };

  handleDragEnd(e) {
    if (e.originalEvent) e = e.originalEvent;

    $(e.target).removeClass('drag-active');

    this.el.removeClass('drag-container-active');
    this.dragging = false;

    this.draggingService.setData(null);
    this.draggingService.setType(null);
  };

  updateDragData(data) {
    this.data = data;

    if (this.dragging) this.draggingService.setData(this.data);
  };

  updateDragType(type) {
    this.type = type || 'text/x-drag-and-drop';

    if (this.dragging) this.draggingService.setType(this.type);
  };

}
