import { createContext } from "react";

interface IAuthContextProps {
  user: {
    name: string;
    lastName: string;
    email: string;
  };
  token: string | null;
  company: string;
  signIn: (
    user: {
      name: string;
      lastName: string;
      email: string;
    },
    token: string,
    company: string
  ) => void;
  signOut: () => void;
}

export const AuthContext = createContext<IAuthContextProps>({
  user: {
    name: "",
    lastName: "",
    email: "",
  },
  token: "",
  company: "",
  signIn: () => {},
  signOut: () => {},
});
