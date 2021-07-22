import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';

@Component({
  templateUrl: './specifikacije-delete-dialog.component.html',
})
export class SpecifikacijeDeleteDialogComponent {
  specifikacije?: ISpecifikacije;

  constructor(protected specifikacijeService: SpecifikacijeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.specifikacijeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
