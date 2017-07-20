// Angular core modules
import { BrowserModule }              from '@angular/platform-browser';
import {
  NgModule,
  APP_INITIALIZER
}                                     from '@angular/core';
import { FormsModule }                from '@angular/forms';
import { 
  HttpModule,
  RequestOptions,
  XHRBackend,
  Http
}                                     from '@angular/http';
import { Router }                     from '@angular/router';

// Routes
import { AppRoutingModule }           from './app-routing.module';

// Modules
import { AppComponent }               from './app.component';
import { AuthModule }                 from './auth/auth.module';
import { ItemsModule }                from './items/items.module';
import { UtilityModule}               from './shared/utility';

// Guards
import { AuthGuard }                  from './shared/guards/auth.guard';
import { CanDeactivateGuard }         from './shared/guards/canDeactivate.guard';

// Services
import { ConfigService }              from './app-config.service';

// Third party libraries
import { SimpleNotificationsModule }  from 'angular2-notifications';
import { NgxDatatableModule }         from '@swimlane/ngx-datatable';

/**
 * Calling functions or calling new is not supported in metadata when using AoT.
 * The work-around is to introduce an exported function.
 *
 * The reason for this limitation is that the AoT compiler needs to generate the code that calls the factory
 * and there is no way to import a lambda from a module, you can only import an exported symbol.
 */

export function configServiceFactory (config: ConfigService) {
  return () => config.load()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular core dependencies
    BrowserModule,
    FormsModule,
    HttpModule,

    // Third party modules
    SimpleNotificationsModule.forRoot(),
    NgxDatatableModule,

    // App custom dependencies
    UtilityModule.forRoot(),

    ItemsModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService], 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }