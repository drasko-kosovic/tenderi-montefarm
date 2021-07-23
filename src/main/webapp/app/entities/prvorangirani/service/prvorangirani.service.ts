import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IPrvorangirani } from '../prvorangirani.model';
import { IPonude } from 'app/entities/ponude/ponude.model';
export type EntityResponseType = HttpResponse<IPrvorangirani>;
export type EntityArrayResponseType = HttpResponse<IPrvorangirani[]>;

@Injectable({ providedIn: 'root' })
export class PrvorangiraniService {
  public resourceUrl = this.applicationConfigService.getEndpointFor('api/prvorangirani');
  public resourceUrlPostupak = this.applicationConfigService.getEndpointFor('api/prvorangirani');
  public resourceUrlPonude = this.applicationConfigService.getEndpointFor('api/prvorangirani-ponude');

  constructor(protected http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  prvorangiraniAll(): any {
    return this.http.get<IPrvorangirani[]>(this.resourceUrl);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrvorangirani>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findPostupak(sifraPostupka: number): any {
    return this.http.get<IPrvorangirani>(`${this.resourceUrl}/${sifraPostupka}`);
  }

  findPonude(sifraPonude: number): any {
    return this.http.get<IPrvorangirani>(`${this.resourceUrlPonude}/${sifraPonude}`);
  }

  getPrvorangiraniPonude(sifraPostupka: number, sifraPonude: number): Observable<IPonude[]> {
    const params = new HttpParams();
    params.set('sifraPostupka', String(sifraPostupka));
    params.set('sifraPonude', String(sifraPonude));

    return this.http.get<IPonude[]>(`${this.resourceUrlPostupak}?sifraPostupka=${sifraPostupka}&sifraPonude=${sifraPonude}`, { params });
  }
}
