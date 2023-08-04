import { createContext } from "react";

interface IAuthContextProps {
  isSignIn: boolean;
  signIn: () => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  isSignIn: false,
  signIn: () => {},
  signOut: () => {},
});
