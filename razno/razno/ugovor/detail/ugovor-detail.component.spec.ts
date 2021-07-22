import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UgovorDetailComponent } from './ugovor-detail.component';

describe('Component Tests', () => {
  describe('Ugovor Management Detail Component', () => {
    let comp: UgovorDetailComponent;
    let fixture: ComponentFixture<UgovorDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [UgovorDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ ugovor: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(UgovorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UgovorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load ugovor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ugovor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
