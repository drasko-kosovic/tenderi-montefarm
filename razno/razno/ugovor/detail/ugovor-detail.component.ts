import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUgovor } from '../ugovor.model';

@Component({
  selector: 'jhi-ugovor-detail',
  templateUrl: './ugovor-detail.component.html',
})
export class UgovorDetailComponent implements OnInit {
  ugovor: IUgovor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ugovor }) => {
      this.ugovor = ugovor;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
