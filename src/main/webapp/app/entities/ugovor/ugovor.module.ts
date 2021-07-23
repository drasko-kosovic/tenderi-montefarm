import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { UgovorComponent } from './list/ugovor.component';
import { UgovorUpdateComponent } from './update/ugovor-update.component';
import { UgovorDeleteDialogComponent } from './delete/ugovor-delete-dialog.component';
import { UgovorRoutingModule } from './route/ugovor-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableExporterModule } from 'mat-table-exporter';
import { JhMaterialModule } from '../../shared/jh-material.module';

@NgModule({
  imports: [SharedModule, UgovorRoutingModule, MatTableModule, MatPaginatorModule, MatSortModule, MatTableExporterModule, JhMaterialModule],
  declarations: [UgovorComponent, UgovorUpdateComponent, UgovorDeleteDialogComponent],
  entryComponents: [UgovorDeleteDialogComponent],
  exports: [UgovorComponent],
})
export class UgovorModule {}
