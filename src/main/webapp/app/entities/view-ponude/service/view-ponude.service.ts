import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IViewPonude, getViewPonudeIdentifier } from '../view-ponude.model';
import { IPonude } from '../../ponude/ponude.model';

export type EntityResponseType = HttpResponse<IViewPonude>;
export type EntityArrayResponseType = HttpResponse<IViewPonude[]>;

@Injectable({ providedIn: 'root' })
export class ViewPonudeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/view_ponude');
  protected resourceUrlSifraPonude = this.applicationConfigService.getEndpointFor('api/view_ponude-sifra-ponude');
  protected resourceUrlPonudePonudjaci = this.applicationConfigService.getEndpointFor('api/ponudjaci_ponude');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(viewPonude: IViewPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(viewPonude);
    return this.http
      .post<IViewPonude>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findSiftraPonude(sifra_ponude: number): any {
    return this.http.get<IViewPonude[]>(`${this.resourceUrlSifraPonude}/${sifra_ponude}`);
  }
  findSiftraPostupak(sifra_postupka: number): any {
    return this.http.get<IViewPonude[]>(`${this.resourceUrl}/${sifra_postupka}`);
  }
  findSiftraPostupakPonudePonudjaci(sifra_postupka: number): any {
    return this.http.get<IPonude[]>(`${this.resourceUrlPonudePonudjaci}/${sifra_postupka}`);
  }
  update(viewPonude: IViewPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(viewPonude);
    return this.http
      .put<IViewPonude>(`${this.resourceUrl}/${getViewPonudeIdentifier(viewPonude) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(viewPonude: IViewPonude): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(viewPonude);
    return this.http
      .patch<IViewPonude>(`${this.resourceUrl}/${getViewPonudeIdentifier(viewPonude) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IViewPonude>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IViewPonude[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addViewPonudeToCollectionIfMissing(
    viewPonudeCollection: IViewPonude[],
    ...viewPonudesToCheck: (IViewPonude | null | undefined)[]
  ): IViewPonude[] {
    const viewPonudes: IViewPonude[] = viewPonudesToCheck.filter(isPresent);
    if (viewPonudes.length > 0) {
      const viewPonudeCollectionIdentifiers = viewPonudeCollection.map(viewPonudeItem => getViewPonudeIdentifier(viewPonudeItem)!);
      const viewPonudesToAdd = viewPonudes.filter(viewPonudeItem => {
        const viewPonudeIdentifier = getViewPonudeIdentifier(viewPonudeItem);
        if (viewPonudeIdentifier == null || viewPonudeCollectionIdentifiers.includes(viewPonudeIdentifier)) {
          return false;
        }
        viewPonudeCollectionIdentifiers.push(viewPonudeIdentifier);
        return true;
      });
      return [...viewPonudesToAdd, ...viewPonudeCollection];
    }
    return viewPonudeCollection;
  }

  protected convertDateFromClient(viewPonude: IViewPonude): IViewPonude {
    return Object.assign({}, viewPonude, {
      datumPonude: viewPonude.datumPonude?.isValid() ? viewPonude.datumPonude.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datumPonude = res.body.datumPonude ? dayjs(res.body.datumPonude) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((viewPonude: IViewPonude) => {
        viewPonude.datumPonude = viewPonude.datumPonude ? dayjs(viewPonude.datumPonude) : undefined;
      });
    }
    return res;
  }
}
