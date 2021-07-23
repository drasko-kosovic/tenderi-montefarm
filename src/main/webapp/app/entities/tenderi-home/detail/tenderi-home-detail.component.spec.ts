import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TenderiHomeDetailComponent } from './tenderi-home-detail.component';

describe('Component Tests', () => {
  describe('TenderiHome Management Detail Component', () => {
    let comp: TenderiHomeDetailComponent;
    let fixture: ComponentFixture<TenderiHomeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TenderiHomeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ tenderiHome: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(TenderiHomeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TenderiHomeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tenderiHome on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tenderiHome).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
