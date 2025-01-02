import { useContext } from "react";
import { UserContext } from "../../store/userContext";

export const useUserProvider = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserProvider must be used within a UserProvider");
    }
    return context;
}
