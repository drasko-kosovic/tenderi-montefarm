import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { HvalePonudeComponent } from './list/hvale-ponude.component';
import { HvalePonudeDetailComponent } from './detail/hvale-ponude-detail.component';
import { HvalePonudeRoutingModule } from './route/hvale-ponude-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [
    SharedModule,
    HvalePonudeRoutingModule,
    MatTableModule,
    MatSortModule,
    MatTableExporterModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    JhMaterialModule,
  ],
  declarations: [HvalePonudeComponent, HvalePonudeDetailComponent],
  exports: [HvalePonudeComponent],
})
export class HvalePonudeModule {}
