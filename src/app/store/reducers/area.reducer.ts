import { createReducer, createSelector, on } from '@ngrx/store';
import * as areaActions from '../actions/area.actions';
import { Area } from '../../models/area.model';

export interface AreaState {
  areas: Area[];
  loading: boolean;
  error: any;
}

export const initialState: AreaState = {
  areas: [],
  loading: false,
  error: null,
};

export const areaReducer = createReducer(
  initialState,
  on(areaActions.loadAreas, (state) => ({ ...state, loading: true })),
  on(areaActions.loadAreasSuccess, (state, { areas }) => ({ ...state, areas, loading: false, error: null })),
  on(areaActions.loadAreasFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectAreaState = (state: any) => state.areas;
export const selectAreaLoadingState = (state: any) => state.loading;

export const selectAreas = createSelector(
  selectAreaState,
  (state: AreaState) => state.areas
);
export const selectAreasLoading = createSelector(
  selectAreaState,
  (state: AreaState) => state.loading
);
