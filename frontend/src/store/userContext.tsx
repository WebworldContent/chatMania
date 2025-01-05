import { createContext, ReactNode, useState } from "react";

interface GlobalUserData {
    email: string;
}

interface UserContextType {
    userData: GlobalUserData | null;
    setUserData: (user: GlobalUserData | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
    const [userData, setUserData] = useState<GlobalUserData | null>(null);

    return (
        <UserContext.Provider value={{userData, setUserData}}>
         { children }
        </UserContext.Provider>
    );
};
