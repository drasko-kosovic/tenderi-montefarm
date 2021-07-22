import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IViewPonude } from '../view-ponude.model';
import { ViewPonudeService } from '../service/view-ponude.service';
import { MatTableDataSource } from '@angular/material/table';
import { IPonude } from '../../ponude/ponude.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PonudeUpdateComponent } from '../../ponude/update/ponude-update.component';
import { MatDialog } from '@angular/material/dialog';
import { PonudeService } from '../../ponude/service/ponude.service';
import * as dayjs from 'dayjs';
import { PonudeDeleteDialogComponent } from '../../ponude/delete/ponude-delete-dialog.component';
import { IPonudePonudjaci } from '../../ponude/ponude_ponudjaci.model';
import { SERVER_API_URL } from '../../../app.constants';

@Component({
  selector: 'jhi-view-ponude',
  templateUrl: './view-ponude.component.html',
  styleUrls: ['./view-ponude.component.scss'],
})
export class ViewPonudeComponent implements AfterViewInit, OnChanges {
  ponude?: IPonude[];
  viewPonudes?: IViewPonude[];
  ponude_ponudjaci?: IPonudePonudjaci[];
  isLoading = false;
  ukupnaPonudjena?: number | null | undefined;
  nadjiPonudjaca?: any;
  aktivno?: boolean;
  public displayedColumns = [
    'sifra postupka',
    'sifraPonude',
    'brojPartije',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'zasticeni naziv',
    'ponudjena vrijednost',
    'rok isporuke',
    'datum ponude',
    'edit',
    'delete',
    'select',
  ];
  public resourceUrlExcelDownload = SERVER_API_URL + 'api/file';
  public dataSource = new MatTableDataSource<IViewPonude>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  @ViewChild('fileInput') fileInput: any;
  message: string | undefined;

  constructor(
    protected viewPonudeService: ViewPonudeService,
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    protected dialog: MatDialog
  ) {}

  public getSifraPostupka(): void {
    this.viewPonudeService.findSiftraPostupak(this.postupak).subscribe((res: IViewPonude[]) => {
      this.dataSource.data = res;
      this.getTotalPonudjena();
    });
  }
  public getSifraPonude(): void {
    this.viewPonudeService.findSiftraPonude(this.nadjiPonudjaca).subscribe((res: IViewPonude[]) => {
      this.dataSource.data = res;
      this.getTotalPonudjena();
    });
  }

  public getPonudePonudjaci(): void {
    this.viewPonudeService.findSiftraPostupakPonudePonudjaci(this.postupak).subscribe((res: IPonudePonudjaci[]) => {
      this.ponude_ponudjaci = res;
    });
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
    datumPonude?: dayjs.Dayjs
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
      () => this.getSifraPostupka()
    );
  }
  addNew(): any {
    const dialogRef = this.dialog.open(PonudeUpdateComponent, {
      data: { IPonude: {}, name: (this.aktivno = false) },
    });

    dialogRef.afterClosed().subscribe(() => this.getSifraPostupka());
  }

  ngOnChanges(): void {
    this.getSifraPostupka();
    this.getSifraPonude();
    this.getPonudePonudjaci();
    this.getTotalPonudjena();
  }

  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getTotalPonudjena(): any {
    return (this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0));
  }
  open(content: any): any {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  deleteSifra(): void {
    this.ponudeService.deleteSifraPonude(this.nadjiPonudjaca).subscribe();
    this.getSifraPostupka();
  }

  updateSelected(id: number): any {
    this.ponudeService.updatePersonSelected(id);
  }
  deleteSelected(): void {
    this.ponudeService.deleteSelected();
    this.getSifraPostupka();
  }
  DownloadExcel(): void {
    window.location.href = this.resourceUrlExcelDownload;
  }

  uploadFile(): any {
    const formData = new FormData();
    formData.append('uploadfiles', this.fileInput.nativeElement.files[0]);

    this.ponudeService.UploadExcel(formData).subscribe((result: { toString: () => string | undefined }) => {
      this.message = result.toString();
      this.getSifraPostupka();
    });
  }
}
