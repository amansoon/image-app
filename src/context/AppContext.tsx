import { ReactNode, createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";
import { ACTION_TYPE, AppState } from "./types";

const initialState: AppState = {
  feed: [],
  photos: [],
  user: null,
};

const AppContext = createContext<AppState>(initialState);

function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addPhotos = (morePhotos: object[]) => {
    dispatch({ type: ACTION_TYPE.ADD_PHOTOS, payload: morePhotos });
  };

  return <AppContext.Provider value={{ ...initialState }}>{children}</AppContext.Provider>;
}

export { AppProvider };
