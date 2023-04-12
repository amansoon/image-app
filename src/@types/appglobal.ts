import { ReactNode } from "react";

export interface State {
  user: object | null,
  feed: object[],
  feedPage: number,
  photos: object[],
  photosPage: number,
  isFetchingPhotos: boolean,
  lastQuery: string | null,
}

export enum ActionType {
  SET_USER,
  SET_FEED ,
  SET_PHOTOS, 
  SET_FETCHING_PHOTOS,
  SET_QUERY,
}

export interface Action {
  type: ActionType;
  payload: any;
}


export type childrenPropType = {
  children: ReactNode;
};

export type Dispatch = (action: Action) => void;

export type ContextType = {
  state: State;
  dispatch: Dispatch;
};


