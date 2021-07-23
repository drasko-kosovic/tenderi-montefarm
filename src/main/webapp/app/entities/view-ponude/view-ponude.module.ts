import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ViewPonudeComponent } from './list/view-ponude.component';
import { ViewPonudeDeleteDialogComponent } from './delete/view-ponude-delete-dialog.component';
import { ViewPonudeRoutingModule } from './route/view-ponude-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [
    SharedModule,
    ViewPonudeRoutingModule,
    MatTableExporterModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    JhMaterialModule,
  ],
  declarations: [ViewPonudeComponent, ViewPonudeDeleteDialogComponent],
  entryComponents: [ViewPonudeDeleteDialogComponent],
  exports: [ViewPonudeComponent],
})
export class ViewPonudeModule {}
