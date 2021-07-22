import { Component, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPostupci, Postupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-postupci-update',
  templateUrl: './postupci-update.component.html',
  styleUrls: ['./update.postupci.scss'],
})
export class PostupciUpdateComponent {
  isSaving = false;
  editForm: FormGroup;
  aktivno: boolean;

  constructor(
    protected postupciService: PostupciService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<PostupciUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, sifraPostupka, brojTendera, opisPostupka, vrstaPostupka, datumObjave, name }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      brojTendera: [brojTendera, [Validators.required]],
      opisPostupka: [opisPostupka, [Validators.required]],
      vrstaPostupka: [vrstaPostupka, [Validators.required]],
      datumObjave: [datumObjave, Validators.required],
    });
    this.aktivno = name;
  }
  public confirmAdd(): void {
    const postupci = this.createFromForm();
    this.subscribeToSaveResponse(this.postupciService.create(postupci));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const postupci = this.createFromForm();
    this.subscribeToSaveResponse(this.postupciService.update(postupci));
  }
  close(): any {
    this.dialogRef.close();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPostupci>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe();
  }
  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
  protected createFromForm(): IPostupci {
    return {
      ...new Postupci(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      brojTendera: this.editForm.get(['brojTendera'])!.value,
      opisPostupka: this.editForm.get(['opisPostupka'])!.value,
      vrstaPostupka: this.editForm.get(['vrstaPostupka'])!.value,
      datumObjave: this.editForm.get(['datumObjave'])!.value,
    };
  }
}
