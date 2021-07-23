import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SpecifikacijeDetailComponent } from './specifikacije-detail.component';

describe('Component Tests', () => {
  describe('Specifikacije Management Detail Component', () => {
    let comp: SpecifikacijeDetailComponent;
    let fixture: ComponentFixture<SpecifikacijeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SpecifikacijeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ specifikacije: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SpecifikacijeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpecifikacijeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load specifikacije on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.specifikacije).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
