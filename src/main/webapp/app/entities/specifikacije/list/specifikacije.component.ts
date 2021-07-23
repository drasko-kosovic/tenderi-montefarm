import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { SpecifikacijeDeleteDialogComponent } from '../delete/specifikacije-delete-dialog.component';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { SERVER_API_URL } from 'app/app.constants';
import { MatDialog } from '@angular/material/dialog';
import { SpecifikacijeUpdateComponent } from 'app/entities/specifikacije/update/specifikacije-update.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls: ['./specifikacije.scss'],
})
export class SpecifikacijeComponent implements AfterViewInit, OnChanges, OnInit {
  specifikacijes?: HttpResponse<ISpecifikacije[]>;
  account: Account | null = null;
  authSubscription?: Subscription;
  aktivno?: boolean;
  public resourceUrlExcelDownload = SERVER_API_URL + 'api/specifikacije/file';
  public displayedColumns = [
    'sifra postupka',
    'broj partije',
    'atc',
    'inn',
    'farmaceutski oblik',
    'jacina lijeka',
    'trazena kolicina',
    'pakovanje',
    'jedinica mjere',
    'procijenjena vrijednost',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<ISpecifikacije>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  @ViewChild('fileInput') fileInput: any;
  message: string | undefined;

  constructor(
    protected specifikacijaService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService,
    protected dialog: MatDialog
  ) {}

  public getSifraPostupka(): void {
    this.specifikacijaService.findSiftraPostupak(this.postupak).subscribe((res: ISpecifikacije[]) => {
      this.dataSource.data = res;
    });
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    brojPartije?: number,
    atc?: string | null,
    inn?: string | null,
    farmaceutskiOblikLijeka?: string | null,
    jacinaLijeka?: string | null,
    trazenaKolicina?: number,
    pakovanje?: string | null,
    jedinicaMjere?: string | null,
    procijenjenaVrijednost?: number
  ): any {
    const dialogRef = this.dialog.open(SpecifikacijeUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        brojPartije,
        atc,
        inn,
        farmaceutskiOblikLijeka,
        jacinaLijeka,
        trazenaKolicina,
        pakovanje,
        jedinicaMjere,
        procijenjenaVrijednost,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() =>
      this.specifikacijaService.query().subscribe((res: HttpResponse<ISpecifikacije[]>) => {
        this.dataSource.data = res.body ?? [];
        this.specifikacijes = res;
      })
    );
  }
  addNew(): any {
    const dialogRef = this.dialog.open(SpecifikacijeUpdateComponent, {
      data: { Specifikacije: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.getSifraPostupka());
  }

  delete(specifikacije: ISpecifikacije[]): void {
    const modalRef = this.modalService.open(SpecifikacijeDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.specifikacije = specifikacije;
    // unsubscribe not needed because closed completes on modal close
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

  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.getSifraPostupka();
  }

  uploadFile(): any {
    const formData = new FormData();
    formData.append('uploadfiles', this.fileInput.nativeElement.files[0]);

    this.specifikacijaService.UploadExcel(formData).subscribe((result: { toString: () => string | undefined }) => {
      this.message = result.toString();
      this.getSifraPostupka();
    });
  }
  DownloadExcel(): void {
    window.location.href = this.resourceUrlExcelDownload;
  }
}
