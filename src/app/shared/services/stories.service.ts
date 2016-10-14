import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EndpointConfigService } from './endpoint-config.service';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoriesService {
  MODEL: string = '/stories/';

  constructor(
    private http: Http,
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
    return this.http.get(this.endpointConfigService.getUrl(
      this.MODEL + this.endpointConfigService.getCurrentFormat()))
      .map(response => response.json())
      .toPromise()
      .then(result => this.utilsService.objectToArray(result));
  };

  fetch(story_id) {
    return this.http.get(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id)
    )
    .map(response => response.json())
    .toPromise();
  };

  create(story) {
    return this.http.post(
      this.endpointConfigService.getUrl(this.MODEL + this.endpointConfigService.getCurrentFormat()), story
    )
    .map(response => response.json())
    .toPromise();
  };

  update(story_id, story) {
    return this.http.put(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id), story
    )
    .map(response => response.json())
    .toPromise();
  };

  destroy(story_id) {
    return this.http.delete(
      this.endpointConfigService.getUrlForId(this.MODEL, story_id)
    )
    .map(response => response.json())
    .toPromise();
  };

}
