import { Component, Inject, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';
import { IPonudjaci } from 'app/entities/ponudjaci/ponudjaci.model';
import { PonudjaciService } from 'app/entities/ponudjaci/service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'jhi-ugovor-update',
  templateUrl: './ugovor-update.component.html',
  styleUrls: ['./ugovor.scss'],
})
export class UgovorUpdateComponent implements OnInit {
  isSaving = false;
  ponudjacis?: IPonudjaci[];
  nadji?: any;
  editForm: FormGroup;
  aktivno: boolean;
  constructor(
    protected ugovorService: UgovorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder,
    protected ponudjaciService: PonudjaciService,
    public dialogRef: MatDialogRef<UgovorUpdateComponent>,
    @Inject(MAT_DIALOG_DATA)
    { id, brojUgovora, brojOdluke, datumOdluke, datumUgovora, iznosUgovoraBezPdf, sifraPostupka, sifraPonude, sifraPonudjaca, name }: any
  ) {
    this.editForm = this.fb.group({
      id: [id],
      brojUgovora: [brojUgovora],
      datumUgovora: [datumUgovora],
      brojOdluke: [brojOdluke],
      datumOdluke: [datumOdluke],
      iznosUgovoraBezPdf: [iznosUgovoraBezPdf],
      sifraPostupka: [sifraPostupka],
      sifraPonude: [sifraPonude],
      sifraPonudjaca: [sifraPonudjaca],
    });
    this.aktivno = name;
  }
  public confirmAdd(): void {
    const ugovor = this.createFromForm();
    this.subscribeToSaveResponse(this.ugovorService.create(ugovor));
    this.dialogRef.close();
  }

  save(): void {
    this.isSaving = true;
    const ugovor = this.createFromForm();
    this.subscribeToSaveResponse(this.ugovorService.update(ugovor));
  }
  close(): any {
    this.dialogRef.close();
  }

  public getPonudjaci(): void {
    this.ponudjaciService.query1().subscribe(res => {
      this.ponudjacis = res;
    });
  }
  ngOnInit(): void {
    this.getPonudjaci();
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUgovor>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe();
  }
  protected onSaveFinalize(): void {
    this.isSaving = false;
  }
  protected createFromForm(): IUgovor {
    return {
      ...new Ugovor(),
      id: this.editForm.get(['id'])!.value,
      brojUgovora: this.editForm.get(['brojUgovora'])!.value,
      datumUgovora: this.editForm.get(['datumUgovora'])!.value,
      brojOdluke: this.editForm.get(['brojOdluke'])!.value,
      datumOdluke: this.editForm.get(['datumOdluke'])!.value,
      iznosUgovoraBezPdf: this.editForm.get(['iznosUgovoraBezPdf'])!.value,
      sifraPostupka: this.editForm.get(['sifraPostupka'])!.value,
      sifraPonude: this.editForm.get(['sifraPonude'])!.value,
      sifraPonudjaca: this.editForm.get(['sifraPonudjaca'])!.value,
    };
  }
}
