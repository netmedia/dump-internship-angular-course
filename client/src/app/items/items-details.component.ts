import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
}                           from '@angular/core';
import { ActivatedRoute }   from '@angular/router';
import { Subscription }     from "rxjs";
import { Item }             from '../shared/models';

@Component({
  selector: 'app-item-details',
  template: `
    <app-layout>
      <h1>Item details</h1>
      <div class="callout large">
        <div class="itemCreate-contentWrapper">
          
        </div>
      </div>
    </app-layout>
  `,
  styles: ['.productDetails-contentWrapper { margin-top: 20px; } .productDetails-backBtn { position: absolute; top: 20px; right: 20px; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsDetailsComponent implements OnInit {

  public item: Item;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }
}
