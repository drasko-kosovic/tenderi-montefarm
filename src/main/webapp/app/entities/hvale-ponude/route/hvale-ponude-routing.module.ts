import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { HvalePonudeComponent } from '../list/hvale-ponude.component';
import { HvalePonudeDetailComponent } from '../detail/hvale-ponude-detail.component';
import { HvalePonudeRoutingResolveService } from './hvale-ponude-routing-resolve.service';

const hvalePonudeRoute: Routes = [
  {
    path: '',
    component: HvalePonudeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: HvalePonudeDetailComponent,
    resolve: {
      hvalePonude: HvalePonudeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(hvalePonudeRoute)],
  exports: [RouterModule],
})
export class HvalePonudeRoutingModule {}
