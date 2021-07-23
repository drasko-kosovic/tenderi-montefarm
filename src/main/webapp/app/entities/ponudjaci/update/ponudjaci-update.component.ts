import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IPonudjaci, Ponudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'jhi-ponudjaci-update',
  templateUrl: './ponudjaci-update.component.html',
  styleUrls: ['./ponudjaci-update.scss'],
})
export class PonudjaciUpdateComponent {
  ponudjacis?: IPonudjaci[];
  isSaving = false;
  editForm: FormGroup;
  nazivPonudjaca: string | undefined;
  aktivno: boolean;

  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<PonudjaciUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, nazivPonudjaca, odgovornoLice, adresaPonudjaca, bankaRacun, name }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      nazivPonudjaca: [nazivPonudjaca, [Validators.required]],
      odgovornoLice: [odgovornoLice, [Validators.required]],
      adresaPonudjaca: [adresaPonudjaca],
      bankaRacun: [bankaRacun],
    });
    this.aktivno = name;
  }
  public confirmAdd(): void {
    const ponudjaci = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudjaciService.create(ponudjaci));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const ponudjaci = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudjaciService.update(ponudjaci));
  }
  close(): any {
    this.dialogRef.close();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonudjaci>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      // () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): IPonudjaci {
    return {
      ...new Ponudjaci(),
      id: this.editForm.get(['id'])!.value,
      nazivPonudjaca: this.editForm.get(['nazivPonudjaca'])!.value,
      odgovornoLice: this.editForm.get(['odgovornoLice'])!.value,
      adresaPonudjaca: this.editForm.get(['adresaPonudjaca'])!.value,
      bankaRacun: this.editForm.get(['bankaRacun'])!.value,
    };
  }
}
