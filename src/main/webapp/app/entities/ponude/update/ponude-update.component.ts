import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPonudjaci } from '../../ponudjaci/ponudjaci.model';

@Component({
  selector: 'jhi-ponude-update',
  templateUrl: './ponude-update.component.html',
  styleUrls: ['./ponude.update.scss'],
})
export class PonudeUpdateComponent implements OnInit {
  ponudjacis?: IPonudjaci[];
  isSaving = false;

  ponude?: IPonude[];
  editForm: FormGroup;
  aktivno: boolean;
  constructor(
    protected ponudeService: PonudeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<PonudeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    {
      id,
      sifraPostupka,
      sifraPonude,
      brojPartije,
      sifraPonudjaca,
      nazivProizvodjaca,
      zasticeniNaziv,
      ponudjenaVrijednost,
      rokIsporuke,
      datumPonude,
      name,
    }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      sifraPostupka: [sifraPostupka, [Validators.required]],
      sifraPonude: [sifraPonude, [Validators.required]],
      brojPartije: [brojPartije, [Validators.required]],
      sifraPonudjaca: [sifraPonudjaca, [Validators.required]],
      nazivProizvodjaca: [nazivProizvodjaca],
      zasticeniNaziv: [zasticeniNaziv],
      ponudjenaVrijednost: [ponudjenaVrijednost, [Validators.required]],
      rokIsporuke: [rokIsporuke, [Validators.required]],
      datumPonude: [datumPonude],
    });
    this.aktivno = name;
  }

  public getPonudjaci(): void {
    this.ponudjaciService.query1().subscribe(res => {
      this.ponudjacis = res;
    });
  }
  ngOnInit(): void {
    this.getPonudjaci();
  }

  public confirmAdd(): void {
    const ponude = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudeService.create(ponude));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const ponude = this.createFromForm();
    this.subscribeToSaveResponse(this.ponudeService.update(ponude));
  }

  close(): any {
    this.dialogRef.close();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPonude>>): void {
    result
      .pipe(finalize(() => this.onSaveFinalize()))
      .subscribe
      // () => this.onSaveSuccess(),
      ();
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected createFromForm(): IPonude {
    return {
      ...new Ponude(),
      id: this.editForm.get(['id'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      brojPartije: this.editForm.get(['brojPartije'])!.value,
      sifraPonudjaca: this.editForm.get(['sifraPonudjaca'])!.value,
      nazivProizvodjaca: this.editForm.get(['nazivProizvodjaca'])!.value,
      zasticeniNaziv: this.editForm.get(['zasticeniNaziv'])!.value,
      ponudjenaVrijednost: this.editForm.get(['ponudjenaVrijednost'])!.value,
      datumPonude: this.editForm.get(['datumPonude'])!.value,
      rokIsporuke: this.editForm.get(['rokIsporuke'])!.value,
    };
  }
}
