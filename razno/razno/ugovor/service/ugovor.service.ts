import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IUgovor, getUgovorIdentifier } from '../ugovor.model';

export type EntityResponseType = HttpResponse<IUgovor>;
export type EntityArrayResponseType = HttpResponse<IUgovor[]>;

@Injectable({ providedIn: 'root' })
export class UgovorService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/ugovors');
  public resourceUrlPostupci = this.applicationConfigService.getEndpointFor('api/ugovor');
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .post<IUgovor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .put<IUgovor>(`${this.resourceUrl}/${getUgovorIdentifier(ugovor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(ugovor: IUgovor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(ugovor);
    return this.http
      .patch<IUgovor>(`${this.resourceUrl}/${getUgovorIdentifier(ugovor) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IUgovor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findSiftraPostupak(sifra_postupka: number): any {
    return this.http.get<[IUgovor]>(`${this.resourceUrlPostupci}/${sifra_postupka}`);
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IUgovor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addUgovorToCollectionIfMissing(ugovorCollection: IUgovor[], ...ugovorsToCheck: (IUgovor | null | undefined)[]): IUgovor[] {
    const ugovors: IUgovor[] = ugovorsToCheck.filter(isPresent);
    if (ugovors.length > 0) {
      const ugovorCollectionIdentifiers = ugovorCollection.map(ugovorItem => getUgovorIdentifier(ugovorItem)!);
      const ugovorsToAdd = ugovors.filter(ugovorItem => {
        const ugovorIdentifier = getUgovorIdentifier(ugovorItem);
        if (ugovorIdentifier == null || ugovorCollectionIdentifiers.includes(ugovorIdentifier)) {
          return false;
        }
        ugovorCollectionIdentifiers.push(ugovorIdentifier);
        return true;
      });
      return [...ugovorsToAdd, ...ugovorCollection];
    }
    return ugovorCollection;
  }

  protected convertDateFromClient(ugovor: IUgovor): IUgovor {
    return Object.assign({}, ugovor, {
      datumUgovora: ugovor.datumUgovora?.isValid() ? ugovor.datumUgovora.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datumUgovora = res.body.datumUgovora ? dayjs(res.body.datumUgovora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((ugovor: IUgovor) => {
        ugovor.datumUgovora = ugovor.datumUgovora ? dayjs(ugovor.datumUgovora) : undefined;
      });
    }
    return res;
  }
}
