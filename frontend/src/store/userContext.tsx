import { createContext, ReactNode, useState } from "react";
import { UserData } from "../interfaces";

interface UserContextType {
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
