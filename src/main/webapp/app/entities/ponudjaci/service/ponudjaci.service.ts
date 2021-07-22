import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPonudjaci, getPonudjaciIdentifier } from '../ponudjaci.model';
export type EntityResponseType = HttpResponse<IPonudjaci>;
export type EntityArrayResponseType = HttpResponse<IPonudjaci[]>;

@Injectable({ providedIn: 'root' })
export class PonudjaciService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ponudjacis');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ponudjaci: IPonudjaci): Observable<EntityResponseType> {
    return this.http.post<IPonudjaci>(this.resourceUrl, ponudjaci, { observe: 'response' });
  }

  update(ponudjaci: IPonudjaci): Observable<EntityResponseType> {
    return this.http.put<IPonudjaci>(`${this.resourceUrl}/${getPonudjaciIdentifier(ponudjaci) as number}`, ponudjaci, {
      observe: 'response',
    });
  }

  partialUpdate(ponudjaci: IPonudjaci): Observable<EntityResponseType> {
    return this.http.patch<IPonudjaci>(`${this.resourceUrl}/${getPonudjaciIdentifier(ponudjaci) as number}`, ponudjaci, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPonudjaci>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPonudjaci[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  query1(): Observable<IPonudjaci[]> {
    return this.http.get<IPonudjaci[]>(this.resourceUrl);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  ponudjaciAll(): any {
    return this.http.get<IPonudjaci[]>(this.resourceUrl);
  }
  addPonudjaciToCollectionIfMissing(
    ponudjaciCollection: IPonudjaci[],
    ...ponudjacisToCheck: (IPonudjaci | null | undefined)[]
  ): IPonudjaci[] {
    const ponudjacis: IPonudjaci[] = ponudjacisToCheck.filter(isPresent);
    if (ponudjacis.length > 0) {
      const ponudjaciCollectionIdentifiers = ponudjaciCollection.map(ponudjaciItem => getPonudjaciIdentifier(ponudjaciItem)!);
      const ponudjacisToAdd = ponudjacis.filter(ponudjaciItem => {
        const ponudjaciIdentifier = getPonudjaciIdentifier(ponudjaciItem);
        if (ponudjaciIdentifier == null || ponudjaciCollectionIdentifiers.includes(ponudjaciIdentifier)) {
          return false;
        }
        ponudjaciCollectionIdentifiers.push(ponudjaciIdentifier);
        return true;
      });
      return [...ponudjacisToAdd, ...ponudjaciCollection];
    }
    return ponudjaciCollection;
  }
}
