//react native context for authentication. Create context component and export it
import { createContext,useState, useEffect } from 'react';
import {storeToken, getToken, removeToken, getcompanyId, storecompanyId, removecompanyId} from '../utils/AuthUtils';

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
        companyId: null,
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
        }

        retrieveToken();
        retrievecompanyId();
    }, []);


    function login(user, business, token) {
        setIsLoggedIn(true);
        setUser(user);
        setBusiness(business);
        setToken(token);
        // Store token in AsyncStorage
        storeToken(token)
        setcompanyId(user._id);
        storecompanyId(user._id);
    }

    function logout() {
        setIsLoggedIn(false);
        setUser({});
        setBusiness({});
        setToken(null);
        // Remove token from AsyncStorage
        removeToken();
        removecompanyId();
    }

    function register(user, business, token) {
        setIsLoggedIn(true);
        setUser(user);
        setBusiness(business);
        setToken(token);
        // Store token in AsyncStorage
        storeToken(token)
        setcompanyId(user._id);
        storecompanyId(user._id);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, business, token, companyId,  login, logout, register }}>
            {props.children}
        </AuthContext.Provider>
    );

}

export { AuthContext, AuthContextProvider };