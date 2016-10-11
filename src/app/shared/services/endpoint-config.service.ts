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
      };

    this.currentEndpoint = endpointMap[CURRENT_BACKEND];
    this.userId = null;
    this.backend = CURRENT_BACKEND;

    // $rootScope.$on('onCurrentUserId', function(event, id){
    //   this.userId = id;
    // });
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
