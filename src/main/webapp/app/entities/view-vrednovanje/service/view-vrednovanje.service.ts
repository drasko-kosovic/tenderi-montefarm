import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

import { IViewVrednovanje } from '../view-vrednovanje.model';

export type EntityResponseType = HttpResponse<IViewVrednovanje>;
export type EntityArrayResponseType = HttpResponse<IViewVrednovanje[]>;

@Injectable({ providedIn: 'root' })
export class ViewVrednovanjeService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/view-vrednovanjes');
  public resourceUrlPostupak = this.applicationConfigService.getEndpointFor('api/vrednovanje');
  public resourceUrlVrednovanjeSifraPonude = this.applicationConfigService.getEndpointFor('api/vrednovanje-ponude');
  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  vrednovanjeAll(): any {
    return this.http.get<IViewVrednovanje[]>(this.resourceUrl);
  }

  findSiftraPonude(sifra_ponude: number): any {
    return this.http.get<IViewVrednovanje[]>(`${this.resourceUrlVrednovanjeSifraPonude}/${sifra_ponude}`);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IViewVrednovanje>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findPostupak(sifraPostupka: number): any {
    return this.http.get<IViewVrednovanje>(`${this.resourceUrlPostupak}/${sifraPostupka}`);
  }
}
