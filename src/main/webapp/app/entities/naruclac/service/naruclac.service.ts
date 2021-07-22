import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INaruclac, getNaruclacIdentifier } from '../naruclac.model';

export type EntityResponseType = HttpResponse<INaruclac>;
export type EntityArrayResponseType = HttpResponse<INaruclac[]>;

@Injectable({ providedIn: 'root' })
export class NaruclacService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/naruclacs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(naruclac: INaruclac): Observable<EntityResponseType> {
    return this.http.post<INaruclac>(this.resourceUrl, naruclac, { observe: 'response' });
  }

  update(naruclac: INaruclac): Observable<EntityResponseType> {
    return this.http.put<INaruclac>(`${this.resourceUrl}/${getNaruclacIdentifier(naruclac) as number}`, naruclac, { observe: 'response' });
  }

  partialUpdate(naruclac: INaruclac): Observable<EntityResponseType> {
    return this.http.patch<INaruclac>(`${this.resourceUrl}/${getNaruclacIdentifier(naruclac) as number}`, naruclac, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<INaruclac>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<INaruclac[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addNaruclacToCollectionIfMissing(naruclacCollection: INaruclac[], ...naruclacsToCheck: (INaruclac | null | undefined)[]): INaruclac[] {
    const naruclacs: INaruclac[] = naruclacsToCheck.filter(isPresent);
    if (naruclacs.length > 0) {
      const naruclacCollectionIdentifiers = naruclacCollection.map(naruclacItem => getNaruclacIdentifier(naruclacItem)!);
      const naruclacsToAdd = naruclacs.filter(naruclacItem => {
        const naruclacIdentifier = getNaruclacIdentifier(naruclacItem);
        if (naruclacIdentifier == null || naruclacCollectionIdentifiers.includes(naruclacIdentifier)) {
          return false;
        }
        naruclacCollectionIdentifiers.push(naruclacIdentifier);
        return true;
      });
      return [...naruclacsToAdd, ...naruclacCollection];
    }
    return naruclacCollection;
  }
}
