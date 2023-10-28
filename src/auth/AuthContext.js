//react native context for authentication. Create context component and export it
import { createContext,useState, useEffect } from 'react';
import {storeToken, getToken, removeToken, setUserId, storeUserId, removeUserId} from '../utils/AuthUtils';

const AuthContext = createContext(
    {
        isLoggedIn: false,
        user: {
            name: '',
        },
        business: {
            Name: '',
            _id: '',
        },
        token: null,
        login: () => {},
        logout: () => {},
        register: () => {}
    }
);


function  AuthContextProvider(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [business, setBusiness] = useState({});
    const [token, setToken] = useState(null);


    // Obtener el token al cargar el componente
    useEffect(() => {
        const retrieveToken = async () => {
            const storedToken = await getToken();
            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);
            }
        };

        retrieveToken();
    }, []);


    function login(user, business, token) {
        setIsLoggedIn(true);
        setUser(user);
        setBusiness(business);
        setToken(token);
        // Store token in AsyncStorage
        storeToken(token)
        setUserId(user._id);
        storeUserId(user._id);
    }

    function logout() {
        setIsLoggedIn(false);
        setUser({});
        setBusiness({});
        setToken(null);
        // Remove token from AsyncStorage
        removeToken();
        removeUserId();
    }

    function register(user, business, token) {
        setIsLoggedIn(true);
        setUser(user);
        setBusiness(business);
        setToken(token);
        // Store token in AsyncStorage
        storeToken(token)
        setUserId(user._id);
        storeUserId(user._id);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, business, token, login, logout, register }}>
            {props.children}
        </AuthContext.Provider>
    );

}

export { AuthContext, AuthContextProvider };