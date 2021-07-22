import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { IPonude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { PonudeDeleteDialogComponent } from 'app/entities/ponude/delete/ponude-delete-dialog.component';
import { IPonudePonudjaci } from 'app/entities/ponude/ponude_ponudjaci.model';
import { SERVER_API_URL } from 'app/app.constants';
import { MatDialog } from '@angular/material/dialog';

import { PonudeUpdateComponent } from 'app/entities/ponude/update/ponude-update.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss'],
})
export class PonudeComponent implements AfterViewInit, OnChanges {
  ponude_ponudjaci?: IPonudePonudjaci[];
  ponude?: IPonude[];
  account: Account | null = null;
  authSubscription?: Subscription;
  ukupnaPonudjena?: number;
  nadjiPonudjaca?: any;
  aktivno?: boolean;

  public resourceUrlExcelDownload = SERVER_API_URL + 'api/file';
  public displayedColumns = [
    'sifra postupka',
    'sifraPonude',
    'brojPartije',
    'sifra ponudjaca',
    'naziv proizvodjaca',
    'zasticeni naziv',
    'ponudjena vrijednost',
    'rok isporuke',
    'datum ponude',
    'edit',
    'delete selected',
    'select',
  ];

  public dataSource = new MatTableDataSource<IPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  @ViewChild('fileInput') fileInput: any;
  message: string | undefined;
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService,
    protected dialog: MatDialog
  ) {}
  refresh(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  getTotalCost(): any {
    return this.ponude?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }
  public getSifraPostupka(): void {
    this.ponudeService.findSiftraPostupak(this.postupak).subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
    });
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    sifraPonude?: number,
    brojPartije?: number,
    sifraPonudjaca?: string | null,
    nazivProizvodjaca?: string | null,
    zasticeniNaziv?: string | null,
    ponudjenaVrijednost?: number,
    rokIsporuke?: number,
    datumPonude?: Data
  ): any {
    const dialogRef = this.dialog.open(PonudeUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        sifraPonude,
        brojPartije,
        sifraPonudjaca,
        nazivProizvodjaca,
        zasticeniNaziv,
        ponudjenaVrijednost,
        rokIsporuke,
        datumPonude,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      () =>
        this.ponudeService.query().subscribe((res: HttpResponse<IPonude[]>) => {
          this.dataSource.data = res.body ?? [];
          // this.ponude = res;
        })
    );
  }

  addNew(): any {
    const dialogRef = this.dialog.open(PonudeUpdateComponent, {
      data: { Ponude: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(
      // eslint-disable-next-line no-console
      () =>
        this.ponudeService.query().subscribe((res: HttpResponse<IPonude[]>) => {
          this.dataSource.data = res.body ?? [];
          // this.ponude = res;
        })
    );
  }

  public getSifraPonude(): void {
    this.ponudeService.findSiftraPonude(this.nadjiPonudjaca).subscribe((res: IPonude[]) => {
      this.dataSource.data = res;
      this.getTotalCost();
    });
  }
  public getSifraPostupkaPonudePonudjaci(): void {
    this.ponudeService.findSiftraPostupakPonudePonudjaci(this.postupak).subscribe((res: IPonudePonudjaci[]) => {
      this.ponude_ponudjaci = res;
    });
  }

  deleteSifra(): void {
    this.ponudeService.deleteSifraPonude(this.nadjiPonudjaca).subscribe();
    this.getSifraPostupka();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngOnChanges(): void {
    this.getSifraPostupka();
    // this.getSifraPostupkaPonudePonudjaci();
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }
  public getSifraPostupkaPonudes(): void {
    this.ponudeService.findSiftraPostupak(this.postupak).subscribe((res: IPonude[]) => {
      this.ponude = res;
    });
  }
  uploadFile(): any {
    const formData = new FormData();
    formData.append('uploadfiles', this.fileInput.nativeElement.files[0]);

    this.ponudeService.UploadExcel(formData).subscribe((result: { toString: () => string | undefined }) => {
      this.message = result.toString();
      this.getSifraPostupka();
    });
  }
  DownloadExcel(): void {
    window.location.href = this.resourceUrlExcelDownload;
  }
  delete(ponude: IPonude[]): void {
    const modalRef = this.modalService.open(PonudeDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ponude = ponude;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.getSifraPostupka();
      }
    });
  }

  open(content: any): any {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  open1(content1: any): any {
    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' });
  }

  updateSelected(id: number): any {
    this.ponudeService.updatePersonSelected(id);
  }

  deleteSelected(): void {
    this.ponudeService.deleteSelected();
    this.getSifraPostupka();
  }
}
