jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IViewVrednovanje, ViewVrednovanje } from '../view-vrednovanje.model';
import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';

import { ViewVrednovanjeRoutingResolveService } from './view-vrednovanje-routing-resolve.service';

describe('Service Tests', () => {
  describe('ViewVrednovanje routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ViewVrednovanjeRoutingResolveService;
    let service: ViewVrednovanjeService;
    let resultViewVrednovanje: IViewVrednovanje | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ViewVrednovanjeRoutingResolveService);
      service = TestBed.inject(ViewVrednovanjeService);
      resultViewVrednovanje = undefined;
    });

    describe('resolve', () => {
      it('should return IViewVrednovanje returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewVrednovanje = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultViewVrednovanje).toEqual({ id: 123 });
      });

      it('should return new IViewVrednovanje if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewVrednovanje = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultViewVrednovanje).toEqual(new ViewVrednovanje());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultViewVrednovanje = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultViewVrednovanje).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
