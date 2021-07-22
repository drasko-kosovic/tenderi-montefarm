jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';

import { UgovorRoutingResolveService } from './ugovor-routing-resolve.service';

describe('Service Tests', () => {
  describe('Ugovor routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: UgovorRoutingResolveService;
    let service: UgovorService;
    let resultUgovor: IUgovor | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(UgovorRoutingResolveService);
      service = TestBed.inject(UgovorService);
      resultUgovor = undefined;
    });

    describe('resolve', () => {
      it('should return IUgovor returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUgovor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultUgovor).toEqual({ id: 123 });
      });

      it('should return new IUgovor if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUgovor = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultUgovor).toEqual(new Ugovor());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultUgovor = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultUgovor).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
