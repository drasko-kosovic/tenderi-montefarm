import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPonude } from '../ponude.model';

@Component({
  selector: 'jhi-ponude-detail',
  templateUrl: './ponude-detail.component.html',
})
export class PonudeDetailComponent implements OnInit {
  ponude: IPonude | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ponude }) => {
      this.ponude = ponude;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
