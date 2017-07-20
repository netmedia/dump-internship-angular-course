import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
}                               from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                               from '@angular/forms';
import {
  ActivatedRoute,
  Router
}                               from '@angular/router';
import { Subscription }         from "rxjs";
import { Item }                 from '../shared/models';
import {
  ValidationService,
  UtilService
}                               from '../shared/utility';
import { ItemsService }         from './items.service';
import { ConfigService }        from '../app-config.service';
import { NotificationsService } from 'angular2-notifications';

const CREATE_SUCCESS_MSG: string = 'Item successfully created';
const UPDATE_SUCCESS_MSG: string = 'Item successfully updated';
const CREATE_ERROR_MSG:   string = 'Error while creating new item';
const UPDATE_ERROR_MSG:   string = 'Error while updating new item';
const DELETE_SUCCESS_MSG: string = 'Item successfully deleted';
const DELETE_ERROR_MSG:   string = 'Error while deleting an item';
const GET_ERROR_MSG:      string = 'Error while getting item details';

@Component({
  selector: 'app-item-create',
  templateUrl: './items-create-or-update.component.html',
  styleUrls: ['./items-create-or-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsCreateOrUpdateComponent implements OnInit {

  public item:        Item;
  public itemForm:    FormGroup;
  public warranty:    string = this.utilService.setYearOffset(1).toJSON().slice(0, 10);
  public submitted:   boolean = false;
  public isLoading:   boolean = false;
  public title:       string = '';
  public page:        string;
  public successMsg:  string = '';
  public errorMsg:    string = '';

  constructor(
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private validationService: ValidationService,
    private utilService: UtilService,
    private itemsService: ItemsService,
    private configService: ConfigService,
    private notificationService: NotificationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.setupPage();
  }

  public onSubmit(form: any) {
    this.isLoading = true;

    let action = this.page === 'create' ? 'createItem' : 'updateItem';

    this.itemsService[action](form)
    .subscribe(
      createdItem => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.success('Success', this.successMsg, this.configService.get('notifications').options);

        this.saveNewItem(createdItem);
        this.router.navigate([`/items/${ this.itemsService.selectedItem.id }/update`]);
      },
      error => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.error('Error', this.errorMsg, this.configService.get('notifications').options);
      }
    );
  }

  public onDelete() {
    this.isLoading = true;

    this.itemsService.deleteItem(this.item.id)
    .subscribe(
      response => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.success('Success', DELETE_SUCCESS_MSG, this.configService.get('notifications').options);

        this.router.navigate(['/items']);
      },
      error => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.error('Error', DELETE_ERROR_MSG, this.configService.get('notifications').options);
      }
    );
  }

  private getItem() {
    this.isLoading = true;

    this.itemsService.getItem(this.route.snapshot.data['routeData'].itemId)
    .subscribe(
      item => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.item = item;
      },
      error => {
        this.changeDetector.markForCheck();
        this.isLoading = false;
        this.notificationService.error('Error', GET_ERROR_MSG, this.configService.get('notifications').options);
      }
    );
  }

  private saveNewItem(item) {
    let itemInstance = new Item(item);

    this.itemsService.saveItemToStorage(itemInstance);
    this.itemsService.selectItem(itemInstance);
  }

  private setupPage() {
    this.page = this.route.snapshot.data['routeData'].page;

    if (this.page === 'create') {
      this.title = 'Create new item';
      this.item = null;
      this.successMsg = CREATE_SUCCESS_MSG;
      this.errorMsg = CREATE_ERROR_MSG;
    } else {
      this.title = 'Update item';
      this.successMsg = UPDATE_SUCCESS_MSG;
      this.errorMsg = UPDATE_ERROR_MSG;

      if (this.itemsService.selectedItem) this.item = this.itemsService.selectedItem;
      else this.getItem();
    }
  }
}
