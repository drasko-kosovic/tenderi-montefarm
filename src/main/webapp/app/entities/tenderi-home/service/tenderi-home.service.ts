import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITenderiHome, getTenderiHomeIdentifier } from '../tenderi-home.model';

export type EntityResponseType = HttpResponse<ITenderiHome>;
export type EntityArrayResponseType = HttpResponse<ITenderiHome[]>;

@Injectable({ providedIn: 'root' })
export class TenderiHomeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/tenderi-homes');
  protected resourceUrlNarucilac = this.applicationConfigService.getEndpointFor('api/naruclacs');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITenderiHome>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITenderiHome[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addTenderiHomeToCollectionIfMissing(
    tenderiHomeCollection: ITenderiHome[],
    ...tenderiHomesToCheck: (ITenderiHome | null | undefined)[]
  ): ITenderiHome[] {
    const tenderiHomes: ITenderiHome[] = tenderiHomesToCheck.filter(isPresent);
    if (tenderiHomes.length > 0) {
      const tenderiHomeCollectionIdentifiers = tenderiHomeCollection.map(tenderiHomeItem => getTenderiHomeIdentifier(tenderiHomeItem)!);
      const tenderiHomesToAdd = tenderiHomes.filter(tenderiHomeItem => {
        const tenderiHomeIdentifier = getTenderiHomeIdentifier(tenderiHomeItem);
        if (tenderiHomeIdentifier == null || tenderiHomeCollectionIdentifiers.includes(tenderiHomeIdentifier)) {
          return false;
        }
        tenderiHomeCollectionIdentifiers.push(tenderiHomeIdentifier);
        return true;
      });
      return [...tenderiHomesToAdd, ...tenderiHomeCollection];
    }
    return tenderiHomeCollection;
  }
}
