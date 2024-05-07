import { createContext, useContext, useState } from "react";

const AcademeetUserContext = createContext();

export const AcademeetUserContextProvider = ({ children }) => {
  const [academeetUsers, setAcademeetUsers] = useState([]);

  const setAcademeetUsersList = (list) => {
    setAcademeetUsers(list);
  };

  return (
    <AcademeetUserContext.Provider
      value={{ academeetUsers, setAcademeetUsersList }}
    >
      {children}
    </AcademeetUserContext.Provider>
  );
};

export const useAcademeetUserContext = () => {
  const context = useContext(AcademeetUserContext);
  if (!context) {
    throw new Error(
      "AcademeetUserContext is not used within the AcademeetUserContextProvider"
    );
  }

  return context;
};
