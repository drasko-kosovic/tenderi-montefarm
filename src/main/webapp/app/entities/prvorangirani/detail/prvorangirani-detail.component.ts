import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrvorangirani } from '../prvorangirani.model';

@Component({
  selector: 'jhi-prvorangirani-detail',
  templateUrl: './prvorangirani-detail.component.html',
})
export class PrvorangiraniDetailComponent implements OnInit {
  prvorangirani: IPrvorangirani | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ prvorangirani }) => {
      this.prvorangirani = prvorangirani;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
