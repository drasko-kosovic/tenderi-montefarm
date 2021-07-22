import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ViewPonudeDetailComponent } from './view-ponude-detail.component';

describe('Component Tests', () => {
  describe('ViewPonude Management Detail Component', () => {
    let comp: ViewPonudeDetailComponent;
    let fixture: ComponentFixture<ViewPonudeDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ViewPonudeDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ viewPonude: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ViewPonudeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ViewPonudeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load viewPonude on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.viewPonude).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
