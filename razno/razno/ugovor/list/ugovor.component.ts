import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUgovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import { UgovorDeleteDialogComponent } from '../delete/ugovor-delete-dialog.component';
import { IPonude } from 'app/entities/ponude/ponude.model';
import { Account } from 'app/core/auth/account.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'app/core/auth/account.service';
import { PonudeDeleteDialogComponent } from 'app/entities/ponude/delete/ponude-delete-dialog.component';

@Component({
  selector: 'jhi-ugovor',
  templateUrl: './ugovor.component.html',
  styleUrls: ['./ugovor.scss'],
})
export class UgovorComponent implements AfterViewInit, OnChanges, OnInit {
  ugovor?: IUgovor[];
  account: Account | null = null;
  authSubscription?: Subscription;

  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'sifra ponudjaca',
    'broj ugovora',
    'datum ugovora',
    'predmet ugovora',
    'naziv ponudjaca',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<IUgovor>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    protected ugovorService: UgovorService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService
  ) {}

  public getSifraPostupka(): void {
    this.ugovorService.findSiftraPostupak(this.postupak).subscribe((res: IUgovor[]) => {
      this.dataSource.data = res;
    });
  }

  delete(ugovor: IUgovor[]): void {
    const modalRef = this.modalService.open(UgovorDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ugovor = ugovor;
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

  ngOnChanges(): void {
    this.getSifraPostupka();
  }
  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
  }
}
