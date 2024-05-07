import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const putAttribute = (attributeName, attributeValue) => {
    if (attributeName === "userLikedProfile" && Array.isArray(attributeValue)) {
      setUser((prev) => ({
        ...prev,
        [attributeName]: prev[attributeName].concat(attributeValue),
      }));
    } else {
      setUser((prev) => ({ ...prev, [attributeName]: attributeValue }));
    }
  };

  const removeAttribute = (attributeName) => {
    setUser((prev) => {
      const newUser = { ...prev };
      delete newUser[attributeName];
      return newUser;
    });
  };
  return (
    <UserContext.Provider
      value={{ user, putAttribute, removeAttribute, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext is not used within the UserContextProvider");
  }

  return context;
};
