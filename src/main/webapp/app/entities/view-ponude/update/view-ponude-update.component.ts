import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IViewPonude, ViewPonude } from '../view-ponude.model';
import { ViewPonudeService } from '../service/view-ponude.service';

@Component({
  selector: 'jhi-view-ponude-update',
  templateUrl: './view-ponude-update.component.html',
})
export class ViewPonudeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(protected viewPonudeService: ViewPonudeService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ viewPonude }) => {
      this.updateForm(viewPonude);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const viewPonude = this.createFromForm();
    if (viewPonude.id !== undefined) {
      this.subscribeToSaveResponse(this.viewPonudeService.update(viewPonude));
    } else {
      this.subscribeToSaveResponse(this.viewPonudeService.create(viewPonude));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IViewPonude>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(viewPonude: IViewPonude): void {
    this.editForm.patchValue({
      id: viewPonude.id,
    });
  }

  protected createFromForm(): IViewPonude {
    return {
      ...new ViewPonude(),
      id: this.editForm.get(['id'])!.value,
    };
  }
}
