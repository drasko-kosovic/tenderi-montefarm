import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { UgovorComponent } from './list/ugovor.component';
import { UgovorDetailComponent } from './detail/ugovor-detail.component';
import { UgovorUpdateComponent } from './update/ugovor-update.component';
import { UgovorDeleteDialogComponent } from './delete/ugovor-delete-dialog.component';
import { UgovorRoutingModule } from './route/ugovor-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  imports: [SharedModule, UgovorRoutingModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTableExporterModule],
  declarations: [UgovorComponent, UgovorDetailComponent, UgovorUpdateComponent, UgovorDeleteDialogComponent],
  entryComponents: [UgovorDeleteDialogComponent],
  exports: [UgovorComponent],
})
export class UgovorModule {}
