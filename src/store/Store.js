import React, { createContext, useReducer } from "react";
import Reducer from "./Reducer";

const initialState = {
  invoices: [],
  articles: [],
  services: [],
  customers: [],
  authors: [],
  subscriptions: [],
  articleAuthors: [],
  invoicesLimit: 10,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
