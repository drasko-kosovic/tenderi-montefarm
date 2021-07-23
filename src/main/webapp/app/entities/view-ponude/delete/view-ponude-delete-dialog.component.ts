import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IViewPonude } from '../view-ponude.model';
import { ViewPonudeService } from '../service/view-ponude.service';

@Component({
  templateUrl: './view-ponude-delete-dialog.component.html',
})
export class ViewPonudeDeleteDialogComponent {
  viewPonude?: IViewPonude;

  constructor(protected viewPonudeService: ViewPonudeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.viewPonudeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
