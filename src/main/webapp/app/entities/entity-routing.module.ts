import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'postupci',
        data: { pageTitle: 'tenderiApp.postupci.home.title' },
        loadChildren: () => import('./postupci/postupci.module').then(m => m.PostupciModule),
      },
      {
        path: 'specifikacije',
        data: { pageTitle: 'tenderiApp.specifikacije.home.title' },
        loadChildren: () => import('./specifikacije/specifikacije.module').then(m => m.SpecifikacijeModule),
      },
      {
        path: 'tenderi-home',
        data: { pageTitle: 'tenderiApp.tenderiHome.home.title' },
        loadChildren: () => import('./tenderi-home/tenderi-home.module').then(m => m.TenderiHomeModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
