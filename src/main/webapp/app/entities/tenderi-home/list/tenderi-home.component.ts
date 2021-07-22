import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';
import { NaruclacService } from '../../naruclac/service/naruclac.service';
import { HttpResponse } from '@angular/common/http';
import { INaruclac } from '../../naruclac/naruclac.model';

@Component({
  selector: 'jhi-tenderi-home',
  templateUrl: './tenderi-home.component.html',
  styleUrls: ['./tenderi-home.components.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TenderiHomeComponent implements OnInit {
  public sifra?: any;
  naruclacs?: HttpResponse<INaruclac[]>;

  constructor(
    protected activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    protected naruciocService: NaruclacService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.sifra = this.activatedRoute.snapshot.params['id'];
    // this.loadAll();
  }

  // loadAll(): void {
  //   this.naruciocService.query().subscribe((res: HttpResponse<INaruclac[]>) => {
  //     this.naruclacs = res;
  //   });
  // }

  refresh(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
