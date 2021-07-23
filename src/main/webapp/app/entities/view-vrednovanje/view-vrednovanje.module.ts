import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ViewVrednovanjeComponent } from './list/view-vrednovanje.component';
import { ViewVrednovanjeDetailComponent } from './detail/view-vrednovanje-detail.component';
import { ViewVrednovanjeRoutingModule } from './route/view-vrednovanje-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [
    SharedModule,
    ViewVrednovanjeRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatTableExporterModule,
    MatSortModule,
    MatPaginatorModule,
    JhMaterialModule,
  ],
  declarations: [ViewVrednovanjeComponent, ViewVrednovanjeDetailComponent],
  exports: [ViewVrednovanjeComponent],
})
export class ViewVrednovanjeModule {}
