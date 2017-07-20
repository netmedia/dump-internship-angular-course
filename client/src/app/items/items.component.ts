import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef
}                               from '@angular/core';
import { Router }               from '@angular/router';
import { Subscription }         from "rxjs";
import { Item }                 from '../shared/models';
import { ItemsService }         from './items.service';
import { ConfigService }        from '../app-config.service';
import { NotificationsService } from 'angular2-notifications';
import { AuthService }          from '../auth/auth.service';

@Component({
  selector: 'app-items',
  template: `
    <app-layout>
      <div class="items-header">
        <h1 class="items-title">Items</h1>
        <button class="basic-btn items-createBtn" routerLink="/items/create">Create</button>
      </div>

      <div class="items-grid-wrapper">
        <ngx-datatable
          class="material striped"
          [rows]="itemsService.items"
          [columns]="[
            { prop: 'name', name: 'Name' },
            { prop: 'price', name: 'Price' },
            { prop: 'currency', name: 'Currency' },
            { prop: 'boughtDate', name: 'Bought Date' },
            { prop: 'warrantyExpiration', name: 'Warranty Expiration' }
          ]"
          [columnMode]="'force'"
          [headerHeight]="50"
          [footerHeight]="50"
          [rowHeight]="43"
          [limit]="10"
          [selectionType]="'single'"
          (select)="onSelect($event)">
        </ngx-datatable>

        <spinner [isRunning]="isLoading"></spinner>
      </div>
    </app-layout>
  `,
  styleUrls: ['./items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsComponent {

  public isLoading: boolean = false;

  constructor(
    private router: Router,
    public itemsService: ItemsService,
    private configService: ConfigService,
    private notificationService: NotificationsService,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getItems();
  }

  /**
   * Callback function for grid select event
   * 
   * @param selected
   */
  public onSelect({ selected }): void {
    this.itemsService.selectItem(selected[0])
    this.router.navigate([`/items/${ selected[0].id }/update`]);
  }

  private getItems() {
    this.isLoading = true;

    this.itemsService.getItems()
    .subscribe(
      res => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
      },
      error => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.error('Error', 'Error while getting the products', this.configService.get('notifications').options);

        if (error.status == 401) {
          this.authService.logout();
        }
      });
  }
}
