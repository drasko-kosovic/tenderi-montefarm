import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { INaruclac } from '../naruclac.model';

@Component({
  selector: 'jhi-naruclac-detail',
  templateUrl: './naruclac-detail.component.html',
})
export class NaruclacDetailComponent implements OnInit {
  naruclac: INaruclac | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ naruclac }) => {
      this.naruclac = naruclac;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
