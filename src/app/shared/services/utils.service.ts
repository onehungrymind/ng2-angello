import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  objectToArray(content) {
    // normalizes data from node and firebase so both get returned as arrays
    if (content instanceof Object && !Array.isArray(content)) {
      var newArray = [];

      for (var key in content) {
        var item = content[key];
        item.id = key;
        newArray.push(item);
      }
      return newArray;

    } else {
      return content;
    }
  };

}
