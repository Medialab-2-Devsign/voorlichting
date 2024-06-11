import { createContext } from "react";

export const ContentfulClientContext = createContext();

export const ContentfulClientProvider = ({ children }) => {
  return (
    <ContentfulClientContext.Provider value={{}}>
      {children}
    </ContentfulClientContext.Provider>
  );
};
