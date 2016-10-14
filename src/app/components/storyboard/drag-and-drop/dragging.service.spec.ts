/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DraggingService } from './dragging.service';

describe('Service: Dragging', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DraggingService]
    });
  });

  it('should ...', inject([DraggingService], (service: DraggingService) => {
    expect(service).toBeTruthy();
  }));
});
