import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { IViewVrednovanje } from '../view-vrednovanje.model';
import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IPonudePonudjaci } from 'app/entities/ponude/ponude_ponudjaci.model';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';

@Component({
  selector: 'jhi-view-vrednovanje',
  templateUrl: './view-vrednovanje.component.html',
  styleUrls: ['./view-vrednovanje.scss'],
})
export class ViewVrednovanjeComponent implements AfterViewInit, OnChanges {
  viewVrednovanjes?: IViewVrednovanje[];
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
    'procijenjena vrijednost',
    'kolicina',
    'ponudjena vrijednost',
    'farmaceutski oblik',
    'jacina lijeka',
    'pakovanje',
    'rok isporuke',
    'naziv ponudjaca',
    'naziv proizvodjaca',
    'bod cijena',
    'bod rok',
    'bod ukupno',
  ];
  public dataSource = new MatTableDataSource<IViewVrednovanje>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;

  constructor(protected vrednovanjeService: ViewVrednovanjeService, protected ponudeService: PonudeService) {}

  getTotalCost(): any {
    return this.viewVrednovanjes?.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }

  getTotalCostProcijenjena(): any {
    return this.viewVrednovanjes?.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  }

  public getSifraPonude(): void {
    this.vrednovanjeService.findSiftraPonude(this.nadjiPonudjaca).subscribe((res: IViewVrednovanje[]) => {
      this.dataSource.data = res;
      this.viewVrednovanjes = res;
      this.getTotalCost();
      this.getTotalCostProcijenjena();
    });
  }

  public getSifraPostupkaPonudePonudjaci(): void {
    this.ponudeService.findSiftraPostupakPonudePonudjaci(this.postupak).subscribe((res: IPonudePonudjaci[]) => {
      this.ponude_ponudjaci = res;
    });
  }

  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
    this.ukupnaProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  public getAllPostupciVrednovanjei(): void {
    this.vrednovanjeService.findPostupak(this.postupak).subscribe((res: IViewVrednovanje[]) => {
      this.dataSource.data = res;
      this.viewVrednovanjes = res;
      this.getTotalCost();
      this.getTotalCostProcijenjena();
      // eslint-disable-next-line no-console
      console.log(res);
    });
  }

  ngOnChanges(): void {
    this.getAllPostupciVrednovanjei();
    this.getSifraPostupkaPonudePonudjaci();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
