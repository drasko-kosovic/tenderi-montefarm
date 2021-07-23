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
      {
        path: 'narucilac',
        data: { pageTitle: 'tenderiApp.narucilac.home.title' },
        loadChildren: () => import('./naruclac/naruclac.module').then(m => m.NaruclacModule),
      },
      {
        path: 'ponudjaci',
        data: { pageTitle: 'tenderiApp.ponudjaci.home.title' },
        loadChildren: () => import('./ponudjaci/ponudjaci.module').then(m => m.PonudjaciModule),
      },
      {
        path: 'ponude',
        data: { pageTitle: 'tenderiApp.ponude.home.title' },
        loadChildren: () => import('./ponude/ponude.module').then(m => m.PonudeModule),
      },
      {
        path: 'view-ponude',
        data: { pageTitle: 'tenderiApp.view-ponude.home.title' },
        loadChildren: () => import('./view-ponude/view-ponude.module').then(m => m.ViewPonudeModule),
      },
      {
        path: 'prvorangirani',
        data: { pageTitle: 'tenderiApp.prvorangirani.home.title' },
        loadChildren: () => import('./prvorangirani/prvorangirani.module').then(m => m.PrvorangiraniModule),
      },
      {
        path: 'vrednovanje',

        loadChildren: () => import('./view-vrednovanje/view-vrednovanje.module').then(m => m.ViewVrednovanjeModule),
      },
      {
        path: 'hvale-ponude',
        data: { pageTitle: 'tenderiApp.hvaleponude.home.title' },
        loadChildren: () => import('./hvale-ponude/hvale-ponude.module').then(m => m.HvalePonudeModule),
      },
      {
        path: 'ugovor',
        data: { pageTitle: 'tenderiApp.ugovor.home.title' },
        loadChildren: () => import('./ugovor/ugovor.module').then(m => m.UgovorModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
