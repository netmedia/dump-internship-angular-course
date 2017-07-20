import { Component }      from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { Subscription }   from "rxjs";
import { ConfigService }  from '../../../app-config.service';
import { AuthService }    from '../../../auth/auth.service';
import { Router }         from '@angular/router';

@Component({
  selector: 'app-layout',
  styleUrls: ['./layout.container.scss'],
  template: `
    <div class="layout-content">
      <app-header
        (logout)="logout()"
        [userImage]="userImage"
        [userName]="userName">
      </app-header>

      <navigation></navigation>
      <ng-content></ng-content>
    </div>
  `
})
export class LayoutContainer {

  public userImage:     string = '';
  public userName:      string = '';
  private assetsFolder: string;

  private subscriptions: Array<Subscription> = [];

  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router
  ) {
    this.assetsFolder = this.configService.get('paths').userImageFolder;
    this.userImage    = this.assetsFolder + 'user.jpg';
    this.userName     = this.authService.user.name;
  }

  public logout() {
    this.authService.user.remove();
    this.router.navigate(['/login']);
  }
}