import React, { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSignIn, setIsSignIn] = useState(false);
  const signIn = () => setIsSignIn(true);
  const signOut = () => setIsSignIn(false);

  const value = { isSignIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
