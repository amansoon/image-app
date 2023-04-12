import { useReducer, useContext, useEffect } from "react";
import { createContext } from "react";
import { reducer } from "./reducer";
import { ContextType, State, childrenPropType } from "@/@types/appglobal";

const initialState: State = {
  user: null,
  feed: [],
  feedPage: 0,
  photos: [],
  photosPage: 0,
  isFetchingPhotos: false,
  lastQuery: null,
};

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

function AppProvider({ children }: childrenPropType) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

// custom hook
export const useAppContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
