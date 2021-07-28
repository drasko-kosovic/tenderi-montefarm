import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITenderiHome } from '../tenderi-home.model';

import { TenderiHomeService } from './tenderi-home.service';

describe('Service Tests', () => {
  describe('TenderiHome Service', () => {
    let service: TenderiHomeService;
    let httpMock: HttpTestingController;
    let elemDefault: ITenderiHome;
    let expectedResult: ITenderiHome | ITenderiHome[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(TenderiHomeService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should return a list of TenderiHome', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      describe('addTenderiHomeToCollectionIfMissing', () => {
        it('should add a TenderiHome to an empty array', () => {
          const tenderiHome: ITenderiHome = { id: 123 };
          expectedResult = service.addTenderiHomeToCollectionIfMissing([], tenderiHome);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tenderiHome);
        });

        it('should not add a TenderiHome to an array that contains it', () => {
          const tenderiHome: ITenderiHome = { id: 123 };
          const tenderiHomeCollection: ITenderiHome[] = [
            {
              ...tenderiHome,
            },
            { id: 456 },
          ];
          expectedResult = service.addTenderiHomeToCollectionIfMissing(tenderiHomeCollection, tenderiHome);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a TenderiHome to an array that doesn't contain it", () => {
          const tenderiHome: ITenderiHome = { id: 123 };
          const tenderiHomeCollection: ITenderiHome[] = [{ id: 456 }];
          expectedResult = service.addTenderiHomeToCollectionIfMissing(tenderiHomeCollection, tenderiHome);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tenderiHome);
        });

        it('should add only unique TenderiHome to an array', () => {
          const tenderiHomeArray: ITenderiHome[] = [{ id: 123 }, { id: 456 }, { id: 91739 }];
          const tenderiHomeCollection: ITenderiHome[] = [{ id: 123 }];
          expectedResult = service.addTenderiHomeToCollectionIfMissing(tenderiHomeCollection, ...tenderiHomeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const tenderiHome: ITenderiHome = { id: 123 };
          const tenderiHome2: ITenderiHome = { id: 456 };
          expectedResult = service.addTenderiHomeToCollectionIfMissing([], tenderiHome, tenderiHome2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(tenderiHome);
          expect(expectedResult).toContain(tenderiHome2);
        });

        it('should accept null and undefined values', () => {
          const tenderiHome: ITenderiHome = { id: 123 };
          expectedResult = service.addTenderiHomeToCollectionIfMissing([], null, tenderiHome, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(tenderiHome);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
