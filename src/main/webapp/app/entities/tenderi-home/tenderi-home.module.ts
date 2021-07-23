import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeDetailComponent } from './detail/tenderi-home-detail.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SpecifikacijeModule } from '../specifikacije/specifikacije.module';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [SharedModule, TenderiHomeRoutingModule, MatTabsModule, SpecifikacijeModule, JhMaterialModule],
  declarations: [TenderiHomeComponent, TenderiHomeDetailComponent],
})
export class TenderiHomeModule {}
