import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INaruclac, Naruclac } from '../naruclac.model';
import { NaruclacService } from '../service/naruclac.service';

@Injectable({ providedIn: 'root' })
export class NaruclacRoutingResolveService implements Resolve<INaruclac> {
  constructor(protected service: NaruclacService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INaruclac> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((naruclac: HttpResponse<Naruclac>) => {
          if (naruclac.body) {
            return of(naruclac.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Naruclac());
  }
}
