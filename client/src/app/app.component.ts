import { Component }      from '@angular/core';
import { Router }         from '@angular/router';
import { ConfigService }  from './app-config.service';
import { AuthService }    from './auth/auth.service';

@Component({
  selector: 'body',
  template: `
    <router-outlet></router-outlet>
    <simple-notifications [options]="getNotificationOptions()"></simple-notifications>
  `,
  host: {'[class.body-loginPage]':'isLoginPage'}
})
export class AppComponent {

  public isLoginPage: boolean;

  constructor(
    private router: Router,
    private configService: ConfigService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.registerEvents();
  }
  
  /**
   * Returns global notification options
   */
  public getNotificationOptions(): any {
  	return this.configService.get('notifications').options;
  }

  /**
   * Loads user from local storage and saves it into auth service for later usage
   */
  private loadUser() {
    var currentUser = JSON.parse(localStorage.getItem('dump-currentUser'));
    this.authService.createUser(currentUser);
  }

  /**
   * Registers events needed for the application
   */
  private registerEvents(): void {
    // Subscribes to route change event and sets "isLoginPage" variable in order to set correct CSS class on body tag.
    this.router.events.subscribe((route) => {
      this.isLoginPage = route['url'] === '/login' ? true : false;
    });
  }
}
