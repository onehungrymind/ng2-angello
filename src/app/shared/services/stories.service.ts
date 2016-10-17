import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { EndpointConfigService } from './endpoint-config.service';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoriesService {
  MODEL: string = '/stories/';

  constructor(
    private authHttp: AuthHttp,
    private endpointConfigService: EndpointConfigService,
    private utilsService: UtilsService
  ) { }

  getBlankStory() {
    return {
      title: '',
      status: '',
      type: '',
      description: '',
      criteria: '',
      reporter: '',
      assignee: ''
    };
  }

  all() {
    return this.authHttp.get(this.endpointConfigService.getUrl(
      this.MODEL + this.endpointConfigService.getCurrentFormat()))
      .map(response => response.json())
      .toPromise()
      .then(result => this.utilsService.objectToArray(result));
  };

  fetch(story_id) {
    return this.authHttp.get(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id)
    )
    .map(response => response.json())
    .toPromise();
  };

  create(story) {
    return this.authHttp.post(
      this.endpointConfigService.getUrl(this.MODEL + this.endpointConfigService.getCurrentFormat()), story
    )
    .map(response => response.json())
    .toPromise();
  };

  update(story_id, story) {
    return this.authHttp.put(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id), story
    )
    .map(response => response.json())
    .toPromise();
  };

  destroy(story_id) {
    return this.authHttp.delete(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id)
    )
    .map(response => response.json())
    .toPromise();
  };

}
