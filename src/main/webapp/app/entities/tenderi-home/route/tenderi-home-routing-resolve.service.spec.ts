jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ITenderiHome, TenderiHome } from '../tenderi-home.model';
import { TenderiHomeService } from '../service/tenderi-home.service';

import { TenderiHomeRoutingResolveService } from './tenderi-home-routing-resolve.service';

describe('Service Tests', () => {
  describe('TenderiHome routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: TenderiHomeRoutingResolveService;
    let service: TenderiHomeService;
    let resultTenderiHome: ITenderiHome | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(TenderiHomeRoutingResolveService);
      service = TestBed.inject(TenderiHomeService);
      resultTenderiHome = undefined;
    });

    describe('resolve', () => {
      it('should return ITenderiHome returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTenderiHome = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTenderiHome).toEqual({ id: 123 });
      });

      it('should return new ITenderiHome if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTenderiHome = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultTenderiHome).toEqual(new TenderiHome());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultTenderiHome = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultTenderiHome).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
