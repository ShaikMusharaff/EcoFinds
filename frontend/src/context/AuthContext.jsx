import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));

    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    );

    useEffect(() => {

        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }

    }, []);

    const login = (jwtToken) => {

        localStorage.setItem("token", jwtToken);

        setToken(jwtToken);

        setIsAuthenticated(true);

    };

    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setIsAuthenticated(false);

    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);