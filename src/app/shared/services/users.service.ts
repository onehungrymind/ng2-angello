import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { EndpointConfigService } from './endpoint-config.service';
import { UtilsService } from './utils.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  private MODEL: string = '/users/';

  constructor(
    private authHttp: AuthHttp,
    private endPointConfigService: EndpointConfigService,
    private utilsService: UtilsService
  ) { }

  all() {
    return this.authHttp.get(this.endPointConfigService.getUrl(this.MODEL + this.endPointConfigService.getCurrentFormat()))
      .map(results => results.json())
      .toPromise()
      .then(result => this.utilsService.objectToArray(result));
  };

  fetch(user_id) {
    return this.authHttp.get(this.endPointConfigService.getUrlForId(this.MODEL, user_id))
      .map(results => results.json())
      .toPromise();
  };

  create(user) {
    return this.authHttp.post(this.endPointConfigService.getUrl(this.MODEL + this.endPointConfigService.getCurrentFormat()), user)
      .map(results => results.json())
      .toPromise();
  };

  update(user_id, user) {
    return this.authHttp.put(this.endPointConfigService.getUrlForId(this.MODEL, user_id), user)
      .map(results => results.json())
      .toPromise();
  };

  destroy(user_id) {
    return this.authHttp.delete(this.endPointConfigService.getUrlForId(this.MODEL, user_id))
      .map(results => results.json())
      .toPromise();
  };

}
