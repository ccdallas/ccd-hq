import { createContext, useContext } from "react";
import { profile } from "../data/profile.js";

const UserContext = createContext();

export function UserProvider({ children }) {
  return (
    <UserContext.Provider value={profile}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
