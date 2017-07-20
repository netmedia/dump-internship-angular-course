import {
  Component,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <a routerLink="/products" routerLinkActive="active" class="header-logo">
        <img src="/assets/images/logo_full_dark.png">
      </a>

      <div class="header-profileBarWrapper">
        <profile-action-bar
          (logout)="logout.emit($event)"
          [userImage]="userImage"
          [userName]="userName">
        </profile-action-bar>
      </div>
    </div>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() userImage: string;
  @Input() userName: string;

  @Output() logout: EventEmitter<any> = new EventEmitter();
}
