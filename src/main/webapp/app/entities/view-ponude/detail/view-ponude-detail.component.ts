import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IViewPonude } from '../view-ponude.model';

@Component({
  selector: 'jhi-view-ponude-detail',
  templateUrl: './view-ponude-detail.component.html',
})
export class ViewPonudeDetailComponent implements OnInit {
  viewPonude: IViewPonude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ viewPonude }) => {
      this.viewPonude = viewPonude;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
