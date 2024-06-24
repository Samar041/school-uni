import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as areaActions from '../actions/area.actions';
import { RegionService } from 'src/app/backadmin/_services/regions.service';

@Injectable()
export class AreaEffects {
  loadAreas$ = createEffect(() =>
    this.actions$.pipe(
      ofType(areaActions.loadAreas),
      switchMap(() =>
        this.areaService.getAreas({}).pipe(
          map((areas) => areaActions.loadAreasSuccess({ areas })),
          catchError((error) => of(areaActions.loadAreasFailure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private areaService: RegionService) { }
}
