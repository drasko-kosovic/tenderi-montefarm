import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PostupciComponent } from '../list/postupci.component';
import { PostupciUpdateComponent } from '../update/postupci-update.component';

const postupciRoute: Routes = [
  {
    path: '',
    component: PostupciComponent,
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'new',
    component: PostupciUpdateComponent,

    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PostupciUpdateComponent,

    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(postupciRoute)],
  exports: [RouterModule],
})
export class PostupciRoutingModule {}
