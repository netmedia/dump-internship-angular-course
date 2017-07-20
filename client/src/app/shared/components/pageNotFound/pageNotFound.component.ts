import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'page-not-found',
  template: `
    <div class="pageNotFound">
    	<div class="pageNotFound-content">
    		<img src="/assets/images/Martian.png" />
      	<h1>Ooops, Page Not Found</h1>
      	<h3>Please, return to the previous page</h3>
      	<button (click)="goBack()">Go Back</button>
    	</div>
    </div>
  `,
  styleUrls: ['./pageNotFound.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {
	constructor(private location: Location) {}

  public goBack() {
    this.location.back();
  }
}