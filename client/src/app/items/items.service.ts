import {
  Injectable,
  Inject,
  forwardRef
}                         from '@angular/core';
import {
  Http,
  Response,
  Headers
}                         from "@angular/http";
import { Router }         from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import { Item }           from '../shared/models';
import { ConfigService }  from '../app-config.service';
import { AuthService }    from '../auth/auth.service';

const ITEMS_URL = '/items';

@Injectable()
export class ItemsService {

  public items: Array<Item> = [];
  public selectedItem: Item;

  constructor(
    private http: Http,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router
  ) {}

  public getItems() {
    let apiEndpoint = this.configService.get('api').baseUrl + ITEMS_URL;

    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);

    return this.http.get(apiEndpoint, { headers })
      .map(response => this.extractData(response))
      .map(response => this.itemsAdapter(response))
      .map(response => this.saveItemsToStorage(response))
      .catch(error => this.handleError(error));
  }

  public getItem(itemId: string) {
    let apiEndpoint = this.configService.get('api').baseUrl + ITEMS_URL + '/' + itemId;

    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);

    return this.http.get(apiEndpoint, { headers })
      .map(response => this.extractData(response))
      .map(response => this.itemAdapter(response))
      .catch(error => this.handleError(error));
  }

  public createItem(item: any) {
    let apiEndpoint = this.configService.get('api').baseUrl + ITEMS_URL;

    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);

    return this.http.post(apiEndpoint, item, { headers })
      .map(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  public updateItem(item: any) {
    let apiEndpoint = this.configService.get('api').baseUrl + ITEMS_URL + '/' + item.id;

    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);

    return this.http.put(apiEndpoint, item, { headers })
      .map(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  public deleteItem(itemId: number) {
    let apiEndpoint = this.configService.get('api').baseUrl + ITEMS_URL + '/' + itemId;

    let headers = new Headers();
    headers = this.createAuthorizationHeader(headers);

    return this.http.delete(apiEndpoint, { headers })
      .map(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  private createAuthorizationHeader(headers: Headers): Headers {
    headers.append('Authorization', 'Bearer ' + this.authService.user.token);
    return headers;
  }

  private itemsAdapter(data: any): Array<Item> {
    return data.map(item => new Item(item))
  }

  private itemAdapter(data: any): Item {
    return new Item(data);
  }

  private saveItemsToStorage(data: Array<Item>) {
    this.items = data;
  }

  public saveItemToStorage(item: Item) {
    this.items.push(item);
  }

  public selectItem(item: Item) {
    this.selectedItem = item;
  }

  /**
   * Transforms json response data into javascript object literal
   * 
   * @param res
   */
  private extractData(res: Response) {
    try {
      return res.json();
    } catch (e) {
      return res;
    }
  }

  /**
   * Handles error response from server.
   * 
   * The catch() operator passes the error object from http to the handleError() method.
   * The handleError method transforms the error into a developer-friendly message,
   * logs it to the console, and returns the message in a new, failed Observable via Observable.throw.
   * 
   * @param error
   */
  private handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      let body = this.extractData(error);
      let err = body.error || body;

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.log(errMsg);

    return Observable.throw(error);
  }
}