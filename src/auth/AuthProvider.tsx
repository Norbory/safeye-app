import React, { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    _id: "",
    name: "",
    lastName: "",
    email: "",
  });
  const [token, setToken] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const signIn = (
    user: {
      _id: string;
      name: string;
      lastName: string;
      email: string;
    },
    token: string,
    company: string
  ) => {
    setUser(user);
    setToken(token);
    setCompany(company);
  };
  const signOut = () => {
    setUser({
      _id: "",
      name: "",
      lastName: "",
      email: "",
    });
    setToken(null);
    setCompany("");
  };

  const value = { user, token, company, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
