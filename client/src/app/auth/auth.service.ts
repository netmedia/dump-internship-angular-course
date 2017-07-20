import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import {
  LoginForm,
  User
}                         from '../shared/models';
import { ConfigService }  from '../app-config.service';
import {
  Http,
  Response
}                         from "@angular/http";
import { Router }         from '@angular/router';
import 'rxjs/add/observable/throw';

const LOGIN_URL = '/login';

@Injectable()
export class AuthService {

  public user: User;

  constructor(
    private http: Http,
    private configService: ConfigService,
    private router: Router
  ) {}

  /**
   * Submits login form to the server
   * 
   * @param form
   */
  public login(form: LoginForm): Observable<any> {
    let apiEndpoint = this.configService.get('api').baseUrl + LOGIN_URL;

    return this.http.post(apiEndpoint, form)
      .map(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  public logout() {
    this.user.remove();
    this.router.navigate(['login']);
  }

  public createUser(user: any) {
    try {
      this.user = new User(user);
    } catch (e) {
      throw e;
    }
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
  private handleError (error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      let body = this.extractData(error);
      let err = body.error || body;

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}