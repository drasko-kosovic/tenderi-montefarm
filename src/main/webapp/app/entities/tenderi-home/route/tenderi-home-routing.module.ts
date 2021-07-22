import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TenderiHomeComponent } from '../list/tenderi-home.component';
import { TenderiHomeDetailComponent } from '../detail/tenderi-home-detail.component';
import { TenderiHomeRoutingResolveService } from './tenderi-home-routing-resolve.service';

const tenderiHomeRoute: Routes = [
  {
    path: '',
    component: TenderiHomeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TenderiHomeDetailComponent,
    resolve: {
      tenderiHome: TenderiHomeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },

  {
    path: ':id',
    component: TenderiHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(tenderiHomeRoute)],
  exports: [RouterModule],
})
export class TenderiHomeRoutingModule {}
