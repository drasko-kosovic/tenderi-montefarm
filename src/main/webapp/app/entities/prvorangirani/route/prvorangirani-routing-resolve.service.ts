import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPrvorangirani, Prvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from '../service/prvorangirani.service';

@Injectable({ providedIn: 'root' })
export class PrvorangiraniRoutingResolveService implements Resolve<IPrvorangirani> {
  constructor(protected service: PrvorangiraniService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrvorangirani> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((prvorangirani: HttpResponse<Prvorangirani>) => {
          if (prvorangirani.body) {
            return of(prvorangirani.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Prvorangirani());
  }
}
