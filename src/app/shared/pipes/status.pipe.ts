import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(stories: any, status: any): any {
    return stories.filter(v => v.status === status);
  }

}
