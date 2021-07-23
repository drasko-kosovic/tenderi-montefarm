import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IViewVrednovanje, ViewVrednovanje } from '../view-vrednovanje.model';
import { ViewVrednovanjeService } from '../service/view-vrednovanje.service';

@Injectable({ providedIn: 'root' })
export class ViewVrednovanjeRoutingResolveService implements Resolve<IViewVrednovanje> {
  constructor(protected service: ViewVrednovanjeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IViewVrednovanje> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((viewVrednovanje: HttpResponse<ViewVrednovanje>) => {
          if (viewVrednovanje.body) {
            return of(viewVrednovanje.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ViewVrednovanje());
  }
}
