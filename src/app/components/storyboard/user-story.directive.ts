import { Directive } from '@angular/core';
import { StoriesService } from '../../shared';

@Directive({
  selector: '[appUserStory]'
})
export class UserStoryDirective {

  constructor(private storiesService: StoriesService) {}

  deleteStory(id) {
    let userStory = this;
    userStory.storiesService.destroy(id)
      .then(function (result) {
        console.log('RESULT', result);
      }, function (reason) {
        console.log('ERROR', reason);
      });
  };

}
