import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITenderiHome } from '../tenderi-home.model';

@Component({
  selector: 'jhi-tenderi-home-detail',
  templateUrl: './tenderi-home-detail.component.html',
})
export class TenderiHomeDetailComponent implements OnInit {
  tenderiHome: ITenderiHome | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tenderiHome }) => {
      this.tenderiHome = tenderiHome;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
