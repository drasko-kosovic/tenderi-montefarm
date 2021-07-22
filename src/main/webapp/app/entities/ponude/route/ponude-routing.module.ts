import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PonudeComponent } from '../list/ponude.component';
import { PonudeDetailComponent } from '../detail/ponude-detail.component';
import { PonudeUpdateComponent } from '../update/ponude-update.component';
import { PonudeRoutingResolveService } from './ponude-routing-resolve.service';

const ponudeRoute: Routes = [
  {
    path: '',
    component: PonudeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PonudeDetailComponent,
    resolve: {
      ponude: PonudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PonudeUpdateComponent,
    resolve: {
      ponude: PonudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PonudeUpdateComponent,
    resolve: {
      ponude: PonudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ponudeRoute)],
  exports: [RouterModule],
})
export class PonudeRoutingModule {}
