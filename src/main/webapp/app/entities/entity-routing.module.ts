import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ponudjaci',
        data: { pageTitle: 'tenderiApp.ponudjaci.home.title' },
        loadChildren: () => import('./ponudjaci/ponudjaci.module').then(m => m.PonudjaciModule),
      },
      {
        path: 'postupci',
        data: { pageTitle: 'tenderiApp.postupci.home.title' },
        loadChildren: () => import('./postupci/postupci.module').then(m => m.PostupciModule),
      },
      // {
      //   path: 'tenderi-home',
      //   data: { pageTitle: 'tenderiApp.tenderiHome.home.title' },
      //   loadChildren: () => import('./tenderi-home/tenderi-home.module').then(m => m.TenderiHomeModule),
      // },
      // {
      //   path: 'specifikacije',
      //   data: { pageTitle: 'tenderiApp.specifikacije.home.title' },
      //   loadChildren: () => import('./specifikacije/specifikacije.module').then(m => m.SpecifikacijeModule),
      // },
      // {
      //   path: 'ponude',
      //   data: { pageTitle: 'tenderiApp.view-ponude.home.title' },
      //   loadChildren: () => import('./view-ponude/view-ponude.module').then(m => m.ViewPonudeModule),
      // },
      // {
      //   path: 'hvale-ponude',
      //   data: { pageTitle: 'tenderiApp.hvaleponude.home.title' },
      //   loadChildren: () => import('./hvale-ponude/hvale-ponude.module').then(m => m.HvalePonudeModule),
      // },
      // {
      //   path: 'vrednovanje',
      //
      //   loadChildren: () => import('./view-vrednovanje/view-vrednovanje.module').then(m => m.ViewVrednovanjeModule),
      // },
      // {
      //   path: 'prvorangirani',
      //   data: { pageTitle: 'tenderiApp.prvorangirani.home.title' },
      //   loadChildren: () => import('./prvorangirani/prvorangirani.module').then(m => m.PrvorangiraniModule),
      // },
      {
        path: 'ugovor',
        data: { pageTitle: 'tenderiApp.ugovor.home.title' },
        loadChildren: () => import('./ugovor/ugovor.module').then(m => m.UgovorModule),
      },
      {
        path: 'narucilac',
        data: { pageTitle: 'tenderiApp.narucilac.home.title' },
        loadChildren: () => import('./naruclac/naruclac.module').then(m => m.NaruclacModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
