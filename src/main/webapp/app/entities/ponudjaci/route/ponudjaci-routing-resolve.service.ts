import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPonudjaci, Ponudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';

@Injectable({ providedIn: 'root' })
export class PonudjaciRoutingResolveService implements Resolve<IPonudjaci> {
  constructor(protected service: PonudjaciService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPonudjaci> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ponudjaci: HttpResponse<Ponudjaci>) => {
          if (ponudjaci.body) {
            return of(ponudjaci.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ponudjaci());
  }
}
