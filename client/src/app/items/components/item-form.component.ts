import {
  Component,
  Input,
  Output,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter
}                           from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
}                           from '@angular/forms';
import {
  ValidationService,
  UtilService
}                           from '../../shared/utility';
import { Item }             from '../../shared/models';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormComponent implements OnInit {

  public itemForm:  FormGroup;
  public warranty:  string = this.utilService.setYearOffset(1).toJSON().slice(0, 10);
  public submitted: boolean = false;

  @Input() item:      Item;
  @Input() isLoading: boolean = false;
  @Output() submited: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private validationService: ValidationService,
    private utilService: UtilService
  ) {}

  ngOnInit() {
    this.initItemForm();
  }

  ngOnChanges(changes) {
    if (this.itemForm && changes.item && typeof changes.item.currentValue !== 'undefined') {
      this.updateForm();
    }
  }

  /**
   * Builds a form instance (using FormBuilder) with corresponding validation rules 
   */
  public initItemForm(): void {
    this.itemForm = this.fb.group({
      id: this.item ? this.item.id : null,
      name: [this.item ? this.item.name : '', [Validators.required]],
      price: this.fb.group({
        amount:   [this.item ? this.item.price : null, Validators.required],
        currency: [this.item ? this.item.currency : 'HRK', Validators.required]
      }),
      warrantyUntilDate: this.item ? this.item.warrantyExpiration : this.utilService.setYearOffset(1).toJSON().slice(0, 10),
      boughtDate: this.item ? this.item.boughtDate : new Date()
    });

    // this.name = this.itemForm.controls['name'];
  }

  private updateForm() {
    this.itemForm.patchValue({
      id: this.item.id,
      name: this.item.name,
      price: {
        amount: this.item.price,
        currency: this.item.currency
      },
      warrantyUntilDate: this.item.warrantyExpiration,
      boughtDate: this.item.boughtDate
    });
  }

  public onSubmit(event: Event, form: any) {
    event.stopPropagation();
    this.submitted = true;

    if (this.itemForm.valid) {
      this.submited.emit(form);
    }
  }
}