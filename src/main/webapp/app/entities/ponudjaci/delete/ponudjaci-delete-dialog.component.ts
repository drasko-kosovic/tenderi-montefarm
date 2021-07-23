import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';

@Component({
  templateUrl: './ponudjaci-delete-dialog.component.html',
})
export class PonudjaciDeleteDialogComponent {
  ponudjaci?: IPonudjaci;

  constructor(protected ponudjaciService: PonudjaciService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ponudjaciService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
