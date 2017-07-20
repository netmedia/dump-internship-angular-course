import { NgModule }                     from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
}                                       from '@angular/forms';
import { RouterModule }                 from '@angular/router';
import { CommonModule }                 from '@angular/common';

import { PipesModule }                  from '../pipes';

import { SpinnerComponent }             from './spinner/spinner.component';
import { NavigationComponent }          from './navigation/navigation.component';
import { ProfileActionBarComponent }    from './profileActionBar/profileActionBar.component';
import { HeaderComponent }              from './header/header.component';
import { PageNotFoundComponent }        from './pageNotFound/pageNotFound.component';

export const COMPONENTS = [
  SpinnerComponent,
  NavigationComponent,
  ProfileActionBarComponent,
  HeaderComponent,
  PageNotFoundComponent
];

@NgModule({
  imports: [
    RouterModule,
  	FormsModule,
  	ReactiveFormsModule,
  	CommonModule,
    PipesModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }