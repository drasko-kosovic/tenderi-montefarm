import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ViewPonudeComponent } from '../list/view-ponude.component';

const viewPonudeRoute: Routes = [
  {
    path: '',
    component: ViewPonudeComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(viewPonudeRoute)],
  exports: [RouterModule],
})
export class ViewPonudeRoutingModule {}
