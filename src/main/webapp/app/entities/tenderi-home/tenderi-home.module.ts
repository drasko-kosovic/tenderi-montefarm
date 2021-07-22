import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeDetailComponent } from './detail/tenderi-home-detail.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SpecifikacijeModule } from '../specifikacije/specifikacije.module';
import { ViewVrednovanjeModule } from '../view-vrednovanje/view-vrednovanje.module';
import { PrvorangiraniModule } from '../prvorangirani/prvorangirani.module';
import { HvalePonudeModule } from '../hvale-ponude/hvale-ponude.module';
import { PonudeModule } from '../ponude/ponude.module';
import { ViewPonudeModule } from '../view-ponude/view-ponude.module';
import { UgovorModule } from '../ugovor/ugovor.module';

@NgModule({
  imports: [
    SharedModule,
    TenderiHomeRoutingModule,
    MatTabsModule,
    SpecifikacijeModule,
    ViewVrednovanjeModule,
    PrvorangiraniModule,
    HvalePonudeModule,
    PonudeModule,
    ViewPonudeModule,
    UgovorModule,
  ],
  declarations: [TenderiHomeComponent, TenderiHomeDetailComponent],
})
export class TenderiHomeModule {}
