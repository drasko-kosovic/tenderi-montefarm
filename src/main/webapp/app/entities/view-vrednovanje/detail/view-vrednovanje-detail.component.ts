import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IViewVrednovanje } from '../view-vrednovanje.model';

@Component({
  selector: 'jhi-view-vrednovanje-detail',
  templateUrl: './view-vrednovanje-detail.component.html',
})
export class ViewVrednovanjeDetailComponent implements OnInit {
  viewVrednovanje: IViewVrednovanje | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ viewVrednovanje }) => {
      this.viewVrednovanje = viewVrednovanje;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
