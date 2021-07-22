import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UgovorComponent } from '../list/ugovor.component';
import { UgovorDetailComponent } from '../detail/ugovor-detail.component';
import { UgovorUpdateComponent } from '../update/ugovor-update.component';
import { UgovorRoutingResolveService } from './ugovor-routing-resolve.service';

const ugovorRoute: Routes = [
  {
    path: '',
    component: UgovorComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UgovorDetailComponent,
    resolve: {
      ugovor: UgovorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UgovorUpdateComponent,
    resolve: {
      ugovor: UgovorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UgovorUpdateComponent,
    resolve: {
      ugovor: UgovorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ugovorRoute)],
  exports: [RouterModule],
})
export class UgovorRoutingModule {}
