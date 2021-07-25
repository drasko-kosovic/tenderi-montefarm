import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SpecifikacijeComponent } from '../list/specifikacije.component';
import { SpecifikacijeUpdateComponent } from '../update/specifikacije-update.component';
import { SpecifikacijeRoutingResolveService } from './specifikacije-routing-resolve.service';

const specifikacijeRoute: Routes = [
  {
    path: '',
    component: SpecifikacijeComponent,
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'new',
    component: SpecifikacijeUpdateComponent,
    resolve: {
      specifikacije: SpecifikacijeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpecifikacijeUpdateComponent,
    resolve: {
      specifikacije: SpecifikacijeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(specifikacijeRoute)],
  exports: [RouterModule],
})
export class SpecifikacijeRoutingModule {}
