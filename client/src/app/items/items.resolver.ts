import { Injectable }     from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
}                         from '@angular/router';

@Injectable()
export class ItemsCreateOrUpdateResolver implements Resolve<any> {

  private productsSubscription;

  constructor() {}

  /**
   * Triggered when application hits product details route.
   * It subscribes to product list data and finds one with id from the route params.  
   *
   * @param route
   */
  public resolve(route: ActivatedRouteSnapshot) {
    return {
      page: route.routeConfig.path.indexOf('create') > -1 ? 'create' : 'update',
      itemId: route.params.id
    };
  }
}