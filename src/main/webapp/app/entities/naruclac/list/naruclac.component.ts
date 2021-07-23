import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INaruclac } from '../naruclac.model';
import { NaruclacService } from '../service/naruclac.service';
import { NaruclacDeleteDialogComponent } from '../delete/naruclac-delete-dialog.component';
import { Account } from '../../../core/auth/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';
import { MatDialog } from '@angular/material/dialog';
import { NaruclacUpdateComponent } from '../update/naruclac-update.component';

@Component({
  selector: 'jhi-naruclac',
  templateUrl: './naruclac.component.html',
  styleUrls: ['./narucilac.scss'],
})
export class NaruclacComponent implements AfterViewInit, OnInit {
  naruclacs?: HttpResponse<INaruclac[]>;
  isLoading = false;
  account: Account | null = null;
  aktivno?: boolean;
  public displayedColumns = ['id', 'naziv', 'odgovorno lice', 'adresa', 'racun', 'telefon', 'email', 'pib', 'pdv', 'delete', 'edit'];

  public dataSource = new MatTableDataSource<INaruclac>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected naruciocService: NaruclacService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  loadAll(): void {
    this.naruciocService.query().subscribe((res: HttpResponse<INaruclac[]>) => {
      this.dataSource.data = res.body ?? [];
      this.naruclacs = res;
    });
  }

  previousState(): void {
    window.history.back();
  }

  delete(narucioc: INaruclac[]): void {
    const modalRef = this.modalService.open(NaruclacDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.naruclac = narucioc;

    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  startEdit(
    id?: number,
    naziv?: number,
    odgovornoLiceNarucioca?: string | null,
    adresa?: string,
    racun?: string,
    email?: string,
    telefon?: string,
    pib?: string,
    pdv?: string
  ): any {
    const dialogRef = this.dialog.open(NaruclacUpdateComponent, {
      data: {
        id,
        naziv,
        odgovornoLiceNarucioca,
        adresa,
        racun,
        email,
        telefon,
        pib,
        pdv,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      () =>
        this.naruciocService.query().subscribe((res: HttpResponse<INaruclac[]>) => {
          this.dataSource.data = res.body ?? [];
          this.naruclacs = res;
        })
    );
  }

  addNew(): any {
    const dialogRef = this.dialog.open(NaruclacUpdateComponent, {
      data: { Naruclac: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadAll();
    });
  }
}
