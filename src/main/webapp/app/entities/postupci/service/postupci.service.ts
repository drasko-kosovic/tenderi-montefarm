import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IPostupci, getPostupciIdentifier } from '../postupci.model';

export type EntityResponseType = HttpResponse<IPostupci>;
export type EntityArrayResponseType = HttpResponse<IPostupci[]>;

@Injectable({ providedIn: 'root' })
export class PostupciService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/postupcis');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  create(postupci: IPostupci): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(postupci);
    return this.http
      .post<IPostupci>(this.resourceUrl, postupci, { observe: 'response' });
      // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(postupci: IPostupci): Observable<EntityResponseType> {
     return this.http.put<IPostupci>(`${this.resourceUrl}/${getPostupciIdentifier(postupci) as number}`, postupci, { observe: 'response' });

  }

  query(): Observable<EntityArrayResponseType> {
    return this.http
      .get<IPostupci[]>(this.resourceUrl, { observe: 'response' });
     }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
