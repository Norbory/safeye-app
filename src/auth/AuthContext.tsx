import { createContext } from "react";

interface IAuthContextProps {
  user: {
    _id: string;
    name: string;
    lastName: string;
    email: string;
  };
  token: string | null;
  company: string;
  signIn: (
    user: {
      _id: string;
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
    _id: "",
    name: "",
    lastName: "",
    email: "",
  },
  token: "",
  company: "",
  signIn: () => {},
  signOut: () => {},
});
