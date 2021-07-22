import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { NaruclacComponent } from './list/naruclac.component';
import { NaruclacDetailComponent } from './detail/naruclac-detail.component';
import { NaruclacUpdateComponent } from './update/naruclac-update.component';
import { NaruclacDeleteDialogComponent } from './delete/naruclac-delete-dialog.component';
import { NaruclacRoutingModule } from './route/naruclac-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [SharedModule, NaruclacRoutingModule, MatTableModule, MatTableExporterModule, MatSortModule, MatPaginatorModule],
  declarations: [NaruclacComponent, NaruclacDetailComponent, NaruclacUpdateComponent, NaruclacDeleteDialogComponent],
  entryComponents: [NaruclacDeleteDialogComponent],
})
export class NaruclacModule {}
