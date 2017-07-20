import { NgModule }                     from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
import { AuthGuard }                    from '../shared/guards/auth.guard';
import { CanDeactivateGuard }           from '../shared/guards/canDeactivate.guard';
import { ItemsComponent }               from './items.component';
import { ItemsDetailsComponent }        from './items-details.component';
import { ItemsCreateOrUpdateComponent } from './items-create-or-update.component';
import { ItemsCreateOrUpdateResolver }  from './items.resolver';

const itemsRoutes: Routes = [
  {
    path: 'items',
    component: ItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'items/create',
    component: ItemsCreateOrUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      routeData: ItemsCreateOrUpdateResolver
    },
  },
  {
    path: 'items/:id/update',
    component: ItemsCreateOrUpdateComponent,
    canActivate: [AuthGuard],
    resolve: {
      routeData: ItemsCreateOrUpdateResolver
    },
  },
  {
    path: 'items/:id',
    component: ItemsDetailsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(itemsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ItemsRoutingModule { }
