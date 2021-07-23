import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPonude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';

@Component({
  templateUrl: './ponude-delete-dialog.component.html',
})
export class PonudeDeleteDialogComponent {
  ponude?: IPonude;

  constructor(protected ponudeService: PonudeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ponudeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
  confirmDeletePonda(sifraPonude: number): void {
    this.ponudeService.deleteSifraPonude(sifraPonude).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
