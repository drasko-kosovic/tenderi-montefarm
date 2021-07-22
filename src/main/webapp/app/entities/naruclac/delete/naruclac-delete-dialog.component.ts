import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { INaruclac } from '../naruclac.model';
import { NaruclacService } from '../service/naruclac.service';

@Component({
  templateUrl: './naruclac-delete-dialog.component.html',
})
export class NaruclacDeleteDialogComponent {
  naruclac?: INaruclac;

  constructor(protected naruclacService: NaruclacService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.naruclacService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
