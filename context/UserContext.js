import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const putAttribute = (attributeName, attirbuteValue) => {
    setUser((prev) => ({ ...prev, [attributeName]: attirbuteValue }));
  };

  const putItemToUserLikedProfile = (profile) => {
    if (!user.userLikedProfile.includes(profile)) {
      setUser((prev) => ({
        ...prev,
        userLikedProfile: [...prev.userLikedProfile, profile],
      }));
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
      value={{
        user,
        putAttribute,
        removeAttribute,
        setUser,
        putItemToUserLikedProfile,
      }}
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
