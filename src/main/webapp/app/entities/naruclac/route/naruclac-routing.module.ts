import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { NaruclacComponent } from '../list/naruclac.component';
import { NaruclacDetailComponent } from '../detail/naruclac-detail.component';
import { NaruclacUpdateComponent } from '../update/naruclac-update.component';
import { NaruclacRoutingResolveService } from './naruclac-routing-resolve.service';

const naruclacRoute: Routes = [
  {
    path: '',
    component: NaruclacComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NaruclacDetailComponent,
    resolve: {
      naruclac: NaruclacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NaruclacUpdateComponent,
    resolve: {
      naruclac: NaruclacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NaruclacUpdateComponent,
    resolve: {
      naruclac: NaruclacRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(naruclacRoute)],
  exports: [RouterModule],
})
export class NaruclacRoutingModule {}
