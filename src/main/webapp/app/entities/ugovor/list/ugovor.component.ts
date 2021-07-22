import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUgovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import { UgovorDeleteDialogComponent } from '../delete/ugovor-delete-dialog.component';
import { Account } from 'app/core/auth/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from 'app/core/auth/account.service';
import { MatDialog } from '@angular/material/dialog';
import { UgovorUpdateComponent } from 'app/entities/ugovor/update/ugovor-update.component';
import { HttpResponse } from '@angular/common/http';
import { Data } from '@angular/router';

@Component({
  selector: 'jhi-ugovor',
  templateUrl: './ugovor.component.html',
  styleUrls: ['./ugovor.scss'],
})
export class UgovorComponent implements AfterViewInit, OnChanges, OnInit {
  ugovor?: HttpResponse<IUgovor[]>;
  account: Account | null = null;
  aktivno?: boolean;
  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'sifra ponudjaca',
    'broj ugovora',
    'datum ugovora',
    'broj odluke',
    'datum odluke',
    'iznos ugovora',

    'delete',
    'edit',
    'print',
    'print-prvorangirani',
  ];

  public dataSource = new MatTableDataSource<IUgovor>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    protected ugovorService: UgovorService,
    protected modalService: NgbModal,
    private accountService: AccountService,
    protected dialog: MatDialog
  ) {}

  public getSifraPostupka(): void {
    this.ugovorService.findSiftraPostupak(this.postupak).subscribe((res: IUgovor[]) => {
      this.dataSource.data = res;
    });
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    sifraPonude?: number,
    sifraPonudjaca?: number,
    iznosUgovoraBezPdf?: number,
    brojUgovora?: string,
    brojOdluke?: string,
    datumOdluke?: Data,
    datumUgovora?: Data
  ): any {
    const dialogRef = this.dialog.open(UgovorUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        sifraPonude,
        sifraPonudjaca,
        iznosUgovoraBezPdf,
        brojUgovora,
        brojOdluke,
        datumOdluke,
        datumUgovora,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() => this.getSifraPostupka());
  }
  addNew(): any {
    const dialogRef = this.dialog.open(UgovorUpdateComponent, {
      data: { Ugovor: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.getSifraPostupka());
  }
  delete(ugovor: IUgovor[]): void {
    const modalRef = this.modalService.open(UgovorDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ugovor = ugovor;
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.getSifraPostupka();
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.getSifraPostupka();
  }
  getPrvorangiraniPonude(sifraPostupka: number, sifraPonude: number): any {
    this.ugovorService.getPrvorangiraniPonude(sifraPostupka, sifraPonude).subscribe();
  }

  printUgovor(broj: string): any {
    this.ugovorService.printReportServiceUgovor(broj).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  printUgovorAnex(sifraPostupka: number, sifraPonude: number): any {
    this.ugovorService.printReportAnexiUgovor(sifraPostupka, sifraPonude).subscribe((response: BlobPart) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
