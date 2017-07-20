import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { BrowserModule }                from "@angular/platform-browser";
import {
  FormsModule,
  ReactiveFormsModule
}                                       from '@angular/forms';
import { RouterModule }                 from '@angular/router';
import { ItemsRoutingModule }           from './items-routing.module';
import { ItemsComponent }               from './items.component';
import { ItemsDetailsComponent }        from './items-details.component';
import { ItemsCreateOrUpdateComponent } from './items-create-or-update.component';
import { ItemFormComponent }            from './components/item-form.component';
import { ItemsService }                 from './items.service';
import { ItemsCreateOrUpdateResolver }  from './items.resolver';

import { ComponentsModule }             from '../shared/components';
import { ContainersModule }             from '../shared/containers';
import { NgxDatatableModule }           from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    ComponentsModule,
    ContainersModule,
    BrowserModule,  
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgxDatatableModule
  ],
  declarations: [
    ItemsComponent,
    ItemsDetailsComponent,
    ItemsCreateOrUpdateComponent,
    ItemFormComponent
  ],
  providers: [
    ItemsService,
    ItemsCreateOrUpdateResolver
  ]
})
export class ItemsModule {}
