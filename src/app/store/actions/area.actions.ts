import { createAction, props } from '@ngrx/store';
import { Area } from '../../models/area.model';

export const loadAreas = createAction('[Area] Load Areas');
export const loadAreasSuccess = createAction('[Area] Load Areas Success', props<{ areas: Area[] }>());
export const loadAreasFailure = createAction('[Area] Load Areas Failure', props<{ error: any }>());
