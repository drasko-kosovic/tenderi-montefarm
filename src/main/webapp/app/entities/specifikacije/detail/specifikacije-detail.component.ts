import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecifikacije } from '../specifikacije.model';

@Component({
  selector: 'jhi-specifikacije-detail',
  templateUrl: './specifikacije-detail.component.html',
})
export class SpecifikacijeDetailComponent implements OnInit {
  specifikacije: ISpecifikacije | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ specifikacije }) => {
      this.specifikacije = specifikacije;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
