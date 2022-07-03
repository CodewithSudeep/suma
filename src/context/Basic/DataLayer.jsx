import React from "react";
import Reducer, { initialState } from "./Reducer";

export const BasicDataLayerContext = React.createContext();

export default function BasicDataLayer({ children }) {
  const [dataLayer, dispatch] = React.useReducer(Reducer, initialState);

  return (
    <BasicDataLayerContext.Provider value={[dataLayer, dispatch]}>
      {children}
    </BasicDataLayerContext.Provider>
  );
}

export const useBasicDataLayerValue = () =>
  React.useContext(BasicDataLayerContext);