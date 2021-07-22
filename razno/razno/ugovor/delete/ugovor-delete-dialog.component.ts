import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUgovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';

@Component({
  templateUrl: './ugovor-delete-dialog.component.html',
})
export class UgovorDeleteDialogComponent {
  ugovor?: IUgovor;

  constructor(protected ugovorService: UgovorService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ugovorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
