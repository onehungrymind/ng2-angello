import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { EndpointConfigService } from './endpoint-config.service';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  private MODEL: string = '/users/';

  constructor(
    private http: Http,
    private endPointConfigService: EndpointConfigService,
    private utilsService: UtilsService
  ) { }

  all() {
    return this.http.get(this.endPointConfigService.getUrl(this.MODEL + this.endPointConfigService.getCurrentFormat()))
      .map(results => results.json())
      .toPromise()
      .then(result => this.utilsService.objectToArray(result));
  };

  fetch(user_id) {
    return this.http.get(this.endPointConfigService.getUrlForId(this.MODEL, user_id))
      .map(results => results.json())
      .toPromise();
  };

  create(user) {
    return this.http.post(this.endPointConfigService.getUrl(this.MODEL + this.endPointConfigService.getCurrentFormat()), user)
      .map(results => results.json())
      .toPromise();
  };

  update(user_id, user) {
    return this.http.put(this.endPointConfigService.getUrlForId(this.MODEL, user_id), user)
      .map(results => results.json())
      .toPromise();
  };

  destroy(user_id) {
    return this.http.delete(this.endPointConfigService.getUrlForId(this.MODEL, user_id))
      .map(results => results.json())
      .toPromise();
  };

}
