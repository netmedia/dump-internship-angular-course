import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import {
  FormsModule,
  ReactiveFormsModule
}                                   from '@angular/forms';
import { AuthRoutingModule }        from './auth-routing.module';
import { LoginComponent }           from './login/login.component';
import { ComponentsModule }         from '../shared/components';
import { AuthService }              from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
