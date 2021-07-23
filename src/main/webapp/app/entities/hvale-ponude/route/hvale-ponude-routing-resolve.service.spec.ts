jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IHvalePonude, HvalePonude } from '../hvale-ponude.model';
import { HvalePonudeService } from '../service/hvale-ponude.service';

import { HvalePonudeRoutingResolveService } from './hvale-ponude-routing-resolve.service';

describe('Service Tests', () => {
  describe('HvalePonude routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: HvalePonudeRoutingResolveService;
    let service: HvalePonudeService;
    let resultHvalePonude: IHvalePonude | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(HvalePonudeRoutingResolveService);
      service = TestBed.inject(HvalePonudeService);
      resultHvalePonude = undefined;
    });

    describe('resolve', () => {
      it('should return IHvalePonude returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHvalePonude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHvalePonude).toEqual({ id: 123 });
      });

      it('should return new IHvalePonude if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHvalePonude = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultHvalePonude).toEqual(new HvalePonude());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultHvalePonude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultHvalePonude).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
