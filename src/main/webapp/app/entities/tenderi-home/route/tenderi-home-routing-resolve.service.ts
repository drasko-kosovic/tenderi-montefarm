import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITenderiHome, TenderiHome } from '../tenderi-home.model';
import { TenderiHomeService } from '../service/tenderi-home.service';

@Injectable({ providedIn: 'root' })
export class TenderiHomeRoutingResolveService implements Resolve<ITenderiHome> {
  constructor(protected service: TenderiHomeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITenderiHome> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((tenderiHome: HttpResponse<TenderiHome>) => {
          if (tenderiHome.body) {
            return of(tenderiHome.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TenderiHome());
  }
}
