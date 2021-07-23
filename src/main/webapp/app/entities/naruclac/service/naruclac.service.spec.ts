import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INaruclac, Naruclac } from '../naruclac.model';

import { NaruclacService } from './naruclac.service';

describe('Service Tests', () => {
  describe('Naruclac Service', () => {
    let service: NaruclacService;
    let httpMock: HttpTestingController;
    let elemDefault: INaruclac;
    let expectedResult: INaruclac | INaruclac[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(NaruclacService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 0,
        naziv: 'AAAAAAA',
        adresa: 'AAAAAAA',
        racun: 'AAAAAAA',
        telefon: 'AAAAAAA',
        pib: 'AAAAAAA',
        pdv: 'AAAAAAA',
        odgovornoLiceNarucioca: 'AAAAAAA',
        email: 'AAAAAAA',
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

      it('should create a Naruclac', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Naruclac()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Naruclac', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            naziv: 'BBBBBB',
            adresa: 'BBBBBB',
            racun: 'BBBBBB',
            telefon: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
            odgovornoLiceNarucioca: 'BBBBBB',
            email: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a Naruclac', () => {
        const patchObject = Object.assign(
          {
            naziv: 'BBBBBB',
            adresa: 'BBBBBB',
            racun: 'BBBBBB',
            telefon: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
          },
          new Naruclac()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Naruclac', () => {
        const returnedFromService = Object.assign(
          {
            id: 1,
            naziv: 'BBBBBB',
            adresa: 'BBBBBB',
            racun: 'BBBBBB',
            telefon: 'BBBBBB',
            pib: 'BBBBBB',
            pdv: 'BBBBBB',
            odgovornoLiceNarucioca: 'BBBBBB',
            email: 'BBBBBB',
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

      it('should delete a Naruclac', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addNaruclacToCollectionIfMissing', () => {
        it('should add a Naruclac to an empty array', () => {
          const naruclac: INaruclac = { id: 123 };
          expectedResult = service.addNaruclacToCollectionIfMissing([], naruclac);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(naruclac);
        });

        it('should not add a Naruclac to an array that contains it', () => {
          const naruclac: INaruclac = { id: 123 };
          const naruclacCollection: INaruclac[] = [
            {
              ...naruclac,
            },
            { id: 456 },
          ];
          expectedResult = service.addNaruclacToCollectionIfMissing(naruclacCollection, naruclac);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a Naruclac to an array that doesn't contain it", () => {
          const naruclac: INaruclac = { id: 123 };
          const naruclacCollection: INaruclac[] = [{ id: 456 }];
          expectedResult = service.addNaruclacToCollectionIfMissing(naruclacCollection, naruclac);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(naruclac);
        });

        it('should add only unique Naruclac to an array', () => {
          const naruclacArray: INaruclac[] = [{ id: 123 }, { id: 456 }, { id: 10038 }];
          const naruclacCollection: INaruclac[] = [{ id: 123 }];
          expectedResult = service.addNaruclacToCollectionIfMissing(naruclacCollection, ...naruclacArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const naruclac: INaruclac = { id: 123 };
          const naruclac2: INaruclac = { id: 456 };
          expectedResult = service.addNaruclacToCollectionIfMissing([], naruclac, naruclac2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(naruclac);
          expect(expectedResult).toContain(naruclac2);
        });

        it('should accept null and undefined values', () => {
          const naruclac: INaruclac = { id: 123 };
          expectedResult = service.addNaruclacToCollectionIfMissing([], null, naruclac, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(naruclac);
        });

        it('should return initial array if no Naruclac is added', () => {
          const naruclacCollection: INaruclac[] = [{ id: 123 }];
          expectedResult = service.addNaruclacToCollectionIfMissing(naruclacCollection, undefined, null);
          expect(expectedResult).toEqual(naruclacCollection);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
