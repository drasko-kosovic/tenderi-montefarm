import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPostupci } from 'app/entities/postupci/postupci.model';
import { PostupciService } from 'app/entities/postupci/service/postupci.service';
import { HttpResponse } from '@angular/common/http';
import { PostupciDeleteDialogComponent } from 'app/entities/postupci/delete/postupci-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { PostupciUpdateComponent } from 'app/entities/postupci/update/postupci-update.component';
@Component({
  selector: 'jhi-postupci',
  templateUrl: './postupci.component.html',
  styleUrls: ['./postupci.component.scss'],
})
export class PostupciComponent implements OnInit, AfterViewInit {
  postupaks?: IPostupci[];
  aktivno?: boolean;
  public displayedColumns = ['sifra postupka', 'opis postupka', 'vrsta postupka', 'datum objave', 'broj tendera', 'delete', 'edit'];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  // clickedRows = new Set<IPostupci>();
  constructor(protected postupciService: PostupciService, protected modalService: NgbModal, public dialog: MatDialog) {}

  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    brojTendera?: string | null,
    opisPostupka?: string,
    vrstaPostupka?: string,
    datumObjave?: Date
  ): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        brojTendera,
        opisPostupka,
        vrstaPostupka,
        datumObjave,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() =>
      this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
        this.dataSource.data = res.body ?? [];
      })
    );
  }
  addNew(): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: { Postupci: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() =>
      this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
        this.dataSource.data = res.body ?? [];
      })
    );
  }
  delete(postupci: IPostupci[]): void {
    const modalRef = this.modalService.open(PostupciDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.postupci = postupci;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
