import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUgovor, Ugovor } from '../ugovor.model';
import { UgovorService } from '../service/ugovor.service';

@Injectable({ providedIn: 'root' })
export class UgovorRoutingResolveService implements Resolve<IUgovor> {
  constructor(protected service: UgovorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUgovor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((ugovor: HttpResponse<Ugovor>) => {
          if (ugovor.body) {
            return of(ugovor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ugovor());
  }
}
