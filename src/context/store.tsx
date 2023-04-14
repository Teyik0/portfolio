'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

interface ContextProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  toggleMenu: boolean;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<ContextProps>({
  page: 0,
  setPage: () => {},
  toggleMenu: false,
  setToggleMenu: () => {},
});

export const GlobalContextProvider = ({ children }: any) => {
  const [page, setPage] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        page,
        setPage,
        toggleMenu,
        setToggleMenu,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
