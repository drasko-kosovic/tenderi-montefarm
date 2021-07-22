import { Component, Inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { INaruclac, Naruclac } from '../naruclac.model';
import { NaruclacService } from '../service/naruclac.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-naruclac-update',
  templateUrl: './naruclac-update.component.html',
  styleUrls: ['./narucioci-update.scss'],
})
export class NaruclacUpdateComponent {
  isSaving = false;
  editForm: FormGroup;
  nazivPonudjaca: string | undefined;
  aktivno: boolean;
  constructor(
    protected naruclacService: NaruclacService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    private dialogRef: MatDialogRef<NaruclacUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) { id, naziv, odgovornoLiceNarucioca, adresa, racun, email, telefon, pib, pdv, name }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      naziv: [naziv, [Validators.required]],
      adresa: [adresa],
      racun: [racun],
      telefon: [telefon],
      pib: [pib],
      pdv: [pdv],
      odgovornoLiceNarucioca: [odgovornoLiceNarucioca],
      email: [email],
    });
    this.aktivno = name;
  }

  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe(({ naruclac }) => {
  //     this.updateForm(naruclac);
  //   });
  // }

  previousState(): void {
    window.history.back();
  }

  public confirmAdd(): void {
    const narucioci = this.createFromForm();
    this.subscribeToSaveResponse(this.naruclacService.create(narucioci));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const narucioci = this.createFromForm();
    this.subscribeToSaveResponse(this.naruclacService.update(narucioci));
  }
  close(): any {
    this.dialogRef.close();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<INaruclac>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  // protected updateForm(naruclac: INaruclac): void {
  //   this.editForm.patchValue({
  //     id: naruclac.id,
  //     naziv: naruclac.naziv,
  //     adresa: naruclac.adresa,
  //     racun: naruclac.racun,
  //     telefon: naruclac.telefon,
  //     pib: naruclac.pib,
  //     pdv: naruclac.pdv,
  //     odgovornoLiceNarucioca: naruclac.odgovornoLiceNarucioca,
  //     email: naruclac.email,
  //   });
  // }

  protected createFromForm(): INaruclac {
    return {
      ...new Naruclac(),
      id: this.editForm.get(['id'])!.value,
      naziv: this.editForm.get(['naziv'])!.value,
      adresa: this.editForm.get(['adresa'])!.value,
      racun: this.editForm.get(['racun'])!.value,
      telefon: this.editForm.get(['telefon'])!.value,
      pib: this.editForm.get(['pib'])!.value,
      pdv: this.editForm.get(['pdv'])!.value,
      odgovornoLiceNarucioca: this.editForm.get(['odgovornoLiceNarucioca'])!.value,
      email: this.editForm.get(['email'])!.value,
    };
  }
}
