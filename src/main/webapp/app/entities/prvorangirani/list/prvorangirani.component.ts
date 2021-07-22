import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';

import { IPrvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from 'app/entities/prvorangirani/service/prvorangirani.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPonudePonudjaci } from 'app/entities/ponude/ponude_ponudjaci.model';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';

@Component({
  selector: 'jhi-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.scss'],
})
export class PrvorangiraniComponent implements OnChanges, AfterViewInit {
  prvorangiranis?: IPrvorangirani[];
  ponude_ponudjaci?: IPonudePonudjaci[];
  ukupnaPonudjena?: number | null | undefined;
  ukupnaProcijenjena?: number | null | undefined;
  nadjiPonudjaca?: any;
  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'inn',
    'zasticeni naziv',
    'farmaceutski oblik',
    'jacina lijeka',
    'pakovanje',
    'procijenjena vrijednost',
    'kolicina',
    'ponudjena vrijednost',
    'rok isporuke',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'bod cijena',
    'bod rok',
    'bod ukupno',
  ];

  public dataSource = new MatTableDataSource<IPrvorangirani>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;
  constructor(protected prvorangiraniService: PrvorangiraniService, protected ponudeService: PonudeService) {}

  public getAllPrvorangiraniPostupak(): void {
    this.prvorangiraniService.findPostupak(4438).subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      this.prvorangiranis = res;
      this.getTotalCost();
    });
  }
  public getSifraPostupkaPonudePonudjaci(): void {
    this.ponudeService.findSiftraPostupakPonudePonudjaci(this.postupak).subscribe((res: IPonudePonudjaci[]) => {
      this.ponude_ponudjaci = res;
    });
  }
  public getSifraPonude(): void {
    this.prvorangiraniService.findPonude(this.nadjiPonudjaca).subscribe((res: IPrvorangirani[]) => {
      this.dataSource.data = res;
      this.prvorangiranis = res;
      this.getTotalCost();
      this.getTotalCostProcijenjena();
    });
  }
  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
    this.ukupnaProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  ngOnChanges(): void {
    this.getAllPrvorangiraniPostupak();
    this.getSifraPostupkaPonudePonudjaci();
    this.getTotalCost();
    this.getTotalCostProcijenjena();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTotalCost(): number {
    return <number>this.prvorangiranis?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }
  getTotalCostProcijenjena(): any {
    return this.prvorangiranis?.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }
}
