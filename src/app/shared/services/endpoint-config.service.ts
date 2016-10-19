import { Injectable } from '@angular/core';
import { CURRENT_BACKEND } from '../';

@Injectable()
export class EndpointConfigService {
  currentEndpoint: {URI: string, root: string, format: string};
  userId: string;
  backend: string;

  constructor() {
    'ngInject';

    const endpointMap = {
        firebase: { URI: 'https://my-first-angello.firebaseio.com/', root: 'clients/', format: '.json' },
        node: { URI: 'http://localhost:4000/', root: 'api/clients/', format: ''}
      },
      profile = JSON.parse(localStorage.getItem('profile'))

    this.currentEndpoint = endpointMap[CURRENT_BACKEND];
    this.userId = profile ? profile.user_id : null;
    this.backend = CURRENT_BACKEND;
  }

  setUser(id) {
    console.log('SETTING USER: ', id);
    this.userId = id;
  }

  getUrl(model) {
    return this.currentEndpoint.URI + this.currentEndpoint.root + this.userId + model;
  }

  getUrlForId(model, id) {
    return this.getUrl(model) + id + this.currentEndpoint.format;
  }

  getCurrentBackend() {
    return this.backend;
  }

  getCurrentFormat() {
    return this.currentEndpoint.format;
  }

  getCurrentURI() {
    return this.currentEndpoint.URI;
  }
}
