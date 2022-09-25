import { createContext, useContext, useReducer, useMemo } from 'react';
import { reducer } from './reducer';

const initialState = {
  isLoading: false,
  isSignout: false,
  userToken: null,
  taxSeasons: [],
  inputFields: [],
  submissions: [],
};

export const StateContext = createContext(initialState, () => initialState);

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return <StateContext.Provider value={contextValue}>{children}</StateContext.Provider>;
}

export const useStateValue = () => useContext(StateContext);
