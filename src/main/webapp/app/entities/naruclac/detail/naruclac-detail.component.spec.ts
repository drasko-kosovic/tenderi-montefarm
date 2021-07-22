import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NaruclacDetailComponent } from './naruclac-detail.component';

describe('Component Tests', () => {
  describe('Naruclac Management Detail Component', () => {
    let comp: NaruclacDetailComponent;
    let fixture: ComponentFixture<NaruclacDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [NaruclacDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ naruclac: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(NaruclacDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NaruclacDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load naruclac on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.naruclac).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
