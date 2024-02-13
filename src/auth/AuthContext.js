import React, { createContext, useState, useEffect } from 'react';
import { storeToken, getToken, removeToken, getcompanyId, storecompanyId, removecompanyId, storeUser, getUser, removeUser } from '../utils/AuthUtils';

const AuthContext = createContext({
  isLoggedIn: false,
  user: {
    name: '',
  },
  business: {
    Name: '',
    _id: '',
  },
  token: null,
  companyId: null,
  login: () => { },
  logout: () => { },
  register: () => { }
});

function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [business, setBusiness] = useState({});
  const [token, setToken] = useState(null);
  const [companyId, setcompanyId] = useState(null);

  // Obtener el token al cargar el componente
  useEffect(() => {
    const retrieveToken = async () => {
      const storedToken = await getToken();
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      }
    };

    const retrievecompanyId = async () => {
      const storedcompanyId = await getcompanyId();
      if (storedcompanyId) {
        setcompanyId(storedcompanyId);
        setIsLoggedIn(true);
      }
    };

    const retrieveUser = async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    };

    retrieveToken();
    retrievecompanyId();
    retrieveUser();
  }, []);

  function login(user, business, token) {
    setIsLoggedIn(true);
    setUser(user);
    setBusiness(business);
    setToken(token);
    // Store token, companyId, and user in AsyncStorage
    storeToken(token);
    storecompanyId(user._id);
    storeUser(user);
  }

  function logout() {
    setIsLoggedIn(false);
    setUser({});
    setBusiness({});
    setToken(null);
    // Remove token, companyId, and user from AsyncStorage
    removeToken();
    removecompanyId();
    removeUser();
  }

  function register(user, business, token) {
    setIsLoggedIn(true);
    setUser(user);
    setBusiness(business);
    setToken(token);
    // Store token, companyId, and user in AsyncStorage
    storeToken(token);
    storecompanyId(user._id);
    storeUser(user);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, business, token, companyId, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
