import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { areaReducer } from './reducers/area.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AreaEffects } from './effects/area.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ areas: areaReducer }),
    EffectsModule.forRoot([AreaEffects]),
  ],
})
export class AppStoreModule { }
