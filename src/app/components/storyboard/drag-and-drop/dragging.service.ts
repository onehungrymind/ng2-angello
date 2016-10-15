import { Injectable } from '@angular/core';

@Injectable()
export class DraggingService {
  private data: any = null;
  private type: any = null;

  constructor() { }

  getData() {
    return this.data;
  }

  getType() {
    return this.type;
  }

  setData(newData) {
    this.data = newData;
    return this.data;
  }

  setType(newType) {
    this.type = newType;
    return this.type;
  }

}
