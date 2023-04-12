import { Action, ActionType, State } from "@/@types/appglobal";

export function reducer(state: State, action: Action): State {
  const { type, payload } = action;

  if (type === ActionType.SET_QUERY) {
    return { ...state, ...payload};
  }

  if (type === ActionType.SET_FETCHING_PHOTOS) {
    return { ...state, isFetchingPhotos: payload};
  }

  if (type === ActionType.SET_FEED) {
    return { ...state, feed: payload,  isFetchingPhotos: false};
  }

  if (type === ActionType.SET_PHOTOS) {
    return { ...state, photos: payload, photosPage: (state.photosPage + 1), isFetchingPhotos: false };
  }

  if (type === ActionType.SET_USER) {
    return { ...state, user: payload };
  }

  return state;
}
