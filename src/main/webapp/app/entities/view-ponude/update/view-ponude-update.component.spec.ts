jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ViewPonudeService } from '../service/view-ponude.service';
import { IViewPonude, ViewPonude } from '../view-ponude.model';

import { ViewPonudeUpdateComponent } from './view-ponude-update.component';

describe('Component Tests', () => {
  describe('ViewPonude Management Update Component', () => {
    let comp: ViewPonudeUpdateComponent;
    let fixture: ComponentFixture<ViewPonudeUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let viewPonudeService: ViewPonudeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ViewPonudeUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ViewPonudeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ViewPonudeUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      viewPonudeService = TestBed.inject(ViewPonudeService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const viewPonude: IViewPonude = { id: 456 };

        activatedRoute.data = of({ viewPonude });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(viewPonude));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ViewPonude>>();
        const viewPonude = { id: 123 };
        jest.spyOn(viewPonudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ viewPonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: viewPonude }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(viewPonudeService.update).toHaveBeenCalledWith(viewPonude);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ViewPonude>>();
        const viewPonude = new ViewPonude();
        jest.spyOn(viewPonudeService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ viewPonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: viewPonude }));
        saveSubject.complete();

        // THEN
        expect(viewPonudeService.create).toHaveBeenCalledWith(viewPonude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ViewPonude>>();
        const viewPonude = { id: 123 };
        jest.spyOn(viewPonudeService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ viewPonude });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(viewPonudeService.update).toHaveBeenCalledWith(viewPonude);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
