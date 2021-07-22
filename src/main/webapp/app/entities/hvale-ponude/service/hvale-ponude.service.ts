import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IHvalePonude, getHvalePonudeIdentifier } from '../hvale-ponude.model';

export type EntityResponseType = HttpResponse<IHvalePonude>;
export type EntityArrayResponseType = HttpResponse<IHvalePonude[]>;

@Injectable({ providedIn: 'root' })
export class HvalePonudeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/hvale-ponudes');
  public resourceUrlHvali = this.applicationConfigService.getEndpointFor('api/hvale');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHvalePonude>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHvalePonude[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  hvali(sifra: number): any {
    return this.http.get(`${this.resourceUrlHvali}/${sifra}`);
  }

  addHvalePonudeToCollectionIfMissing(
    hvalePonudeCollection: IHvalePonude[],
    ...hvalePonudesToCheck: (IHvalePonude | null | undefined)[]
  ): IHvalePonude[] {
    const hvalePonudes: IHvalePonude[] = hvalePonudesToCheck.filter(isPresent);
    if (hvalePonudes.length > 0) {
      const hvalePonudeCollectionIdentifiers = hvalePonudeCollection.map(hvalePonudeItem => getHvalePonudeIdentifier(hvalePonudeItem)!);
      const hvalePonudesToAdd = hvalePonudes.filter(hvalePonudeItem => {
        const hvalePonudeIdentifier = getHvalePonudeIdentifier(hvalePonudeItem);
        if (hvalePonudeIdentifier == null || hvalePonudeCollectionIdentifiers.includes(hvalePonudeIdentifier)) {
          return false;
        }
        hvalePonudeCollectionIdentifiers.push(hvalePonudeIdentifier);
        return true;
      });
      return [...hvalePonudesToAdd, ...hvalePonudeCollection];
    }
    return hvalePonudeCollection;
  }
}
