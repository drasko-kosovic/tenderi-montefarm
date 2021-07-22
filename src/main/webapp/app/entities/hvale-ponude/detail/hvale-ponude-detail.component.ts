import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHvalePonude } from '../hvale-ponude.model';

@Component({
  selector: 'jhi-hvale-ponude-detail',
  templateUrl: './hvale-ponude-detail.component.html',
})
export class HvalePonudeDetailComponent implements OnInit {
  hvalePonude: IHvalePonude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hvalePonude }) => {
      this.hvalePonude = hvalePonude;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
