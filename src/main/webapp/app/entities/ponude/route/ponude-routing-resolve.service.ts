import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPonude, Ponude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';

@Injectable({ providedIn: 'root' })
export class PonudeRoutingResolveService implements Resolve<IPonude> {
  constructor(protected service: PonudeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPonude> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ponude: HttpResponse<Ponude>) => {
          if (ponude.body) {
            return of(ponude.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ponude());
  }
}
