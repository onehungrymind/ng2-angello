import { Directive, ElementRef, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { DraggingService } from './dragging.service';

@Directive({
  selector: '[appDropContainer]'
})
export class DropContainerDirective implements OnInit, OnChanges, OnDestroy{
  @Input() accepts: string[] = ['text/x-drag-and-drop'];
  @Output() onDragEnter = new EventEmitter();
  @Output() onDragOver = new EventEmitter();
  @Output() onDragLeave = new EventEmitter();
  @Output() onDrop = new EventEmitter();
  targets: {} = {};
  validAnchors: string = 'center top top-right right bottom-right bottom bottom-left left top-left';
  el: JQuery = $(this.element.nativeElement);
  activeTarget: any;
  activeAnchor: any;

  constructor(
    private draggingService: DraggingService,
    private element: ElementRef
  ) { }

  ngOnInit() {
    this.el.on('dragenter', this.handleDragEnter.bind(this));
    this.el.on('dragover', this.handleDragOver.bind(this));
    this.el.on('dragleave', this.handleDragLeave.bind(this));
    this.el.on('drop', this.handleDrop.bind(this));

    $(document).on('dragend', this.handleDragEnd.bind(this));

    this.el.addClass('drop-container');
  }

  ngOnChanges(changes) {
    this.updateMimeTypes(changes.accepts.currentValue);
  }

  ngOnDestroy() {
    $(document).off('dragend', this.handleDragEnd.bind(this));
  }

  addDropTarget(anchor, dropTarget) {
    if (this.validAnchors.indexOf(anchor) < 0) throw new Error('Invalid anchor point ' + anchor);
    if (this.targets[anchor]) throw new Error('Duplicate drop targets for the anchor ' + anchor);

    this.targets[anchor] = dropTarget;
  };

  removeDropTarget(anchor) {
    if (this.targets[anchor] && this.targets[anchor] === anchor) {
      this.activeTarget = null;
    }

    delete this.targets[anchor];
  };

  updateMimeTypes(mimeTypes) {
    if (!mimeTypes) mimeTypes = ['text/x-drag-and-drop'];
    if (!Array.isArray(mimeTypes)) mimeTypes = [mimeTypes];

    // console.log('this.updateMimeTypes', mimeTypes);

    this.accepts = mimeTypes;
  };

  updateDragTarget(e, skipUpdateTarget) {
    let dropContainer = this;
    if (e.originalEvent) e = e.originalEvent;

    var activeTarget = null;
    var activeAnchor = null;
    var minDistanceSq = Number.MAX_VALUE;

    var prevAnchor = dropContainer.activeAnchor;
    var prevTarget = dropContainer.activeTarget;

    if (!skipUpdateTarget) {
      $.each(dropContainer.targets, function (dropTarget, anchor) {
        var width = dropContainer.el[0].offsetWidth;
        var height = dropContainer.el[0].offsetHeight;
        var anchorX = width / 2;
        var anchorY = height / 2;

        if (anchor.indexOf('left') >= 0) anchorX = 0;
        if (anchor.indexOf('top') >= 0) anchorY = 0;
        if (anchor.indexOf('right') >= 0) anchorX = width;
        if (anchor.indexOf('bottom') >= 0) anchorY = height;

        var distanceSq = Math.pow(anchorX - e.offsetX, 2) + Math.pow(anchorY - e.offsetY, 2);

        if (distanceSq < minDistanceSq) {
          activeAnchor = anchor;
          activeTarget = dropTarget;
          minDistanceSq = distanceSq;
        }
      });
    }

    dropContainer.activeAnchor = activeAnchor;
    dropContainer.activeTarget = activeTarget;

    var eventData = {
      $event: e,
      data: dropContainer.draggingService.getData(),
      anchor: activeAnchor,
      target: activeTarget,
      prevAnchor: prevAnchor,
      prevTarget: prevTarget
    };

    if (prevTarget !== activeTarget) {
      if (prevTarget) {
        dropContainer.el.removeClass('drop-container-active-' + prevAnchor);
        prevTarget.handleDragLeave(eventData);
      }

      if (activeTarget) {
        dropContainer.el.addClass('drop-container-active-' + activeAnchor);
        activeTarget.handleDragEnter(eventData);
      }
    }

    return eventData;
  };

  handleDragEnter(e) {
    if (e.originalEvent) e = e.originalEvent;

    // console.log('handleDragEnter', e, this.accepts, this.draggingService.getType());

    if (!this.accepts || this.accepts.indexOf(this.draggingService.getType()) >= 0) {
      e.preventDefault();
    } else {
      return;
    }

    var eventData = this.updateDragTarget(e, false);

    this.el.children().css({'pointer-events': 'none'});
    this.el.addClass('drop-container-active');

    if (this.onDragEnter) {
      this.onDragEnter.emit(eventData);
    }
  };

  handleDragOver(e) {
    if (e.originalEvent) e = e.originalEvent;

    // console.log('this.handleDragOver', e);

    if (!this.accepts || this.accepts.indexOf(this.draggingService.getType()) >= 0) {
      e.preventDefault();
    } else {
      return;
    }

    var eventData = this.updateDragTarget(e, false);

    if (eventData.target) {
      eventData.target.handleDragOver(eventData);
    }

    if (this.onDragOver) {
      this.onDragOver.emit(eventData);
    }
  };

  handleDragLeave(e) {
    if (e.originalEvent) e = e.originalEvent;

    // console.log('this.handleDragLeave', e);

    var eventData = this.updateDragTarget(e, true);

    this.el.children().css({'pointer-events': null});
    this.el.removeClass('drop-container-active');

    if (this.onDragLeave) {
      this.onDragLeave.emit(eventData);
    }
  };

  handleDragEnd(e) {
    // console.log('this.handleDragEnd', e);

    this.el.children().css({'pointer-events': null});
    this.el.removeClass('drop-container-active');
  };

  handleDrop(e) {
    if (e.originalEvent) e = e.originalEvent;

    // console.log('this.handleDrop', e);

    if (!this.accepts || this.accepts.indexOf(this.draggingService.getType()) >= 0) {
      e.preventDefault();
    } else {
      return;
    }

    var eventData = this.updateDragTarget(e, false);

    if (eventData.target) {
      eventData.target.handleDrop(eventData);
    }

    if (this.onDrop) {
      this.onDrop.emit(eventData);
    }

    this.handleDragEnd(e);
  };

}
