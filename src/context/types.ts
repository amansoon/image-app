import { ReactNode } from "react";

export type AppState = {
  feed: object[];
  photos: object[];
  user: object | null;
};

export enum ACTION_TYPE {
  ADD_PHOTOS,
  ADD_FEED,
  SET_USER,
};

export type ActionType = {
  type: ACTION_TYPE;
  payload: unknown;
};

export type ReducerProps = {
  state: AppState;
  action: ActionType;
};

