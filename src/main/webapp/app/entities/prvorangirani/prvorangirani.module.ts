import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { PrvorangiraniComponent } from './list/prvorangirani.component';
import { PrvorangiraniDetailComponent } from './detail/prvorangirani-detail.component';
import { PrvorangiraniRoutingModule } from './route/prvorangirani-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [
    SharedModule,
    PrvorangiraniRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatTableExporterModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    JhMaterialModule,
  ],
  declarations: [PrvorangiraniComponent, PrvorangiraniDetailComponent],
  exports: [PrvorangiraniComponent],
})
export class PrvorangiraniModule {}
