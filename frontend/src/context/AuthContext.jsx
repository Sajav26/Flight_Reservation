import {
    createContext,
    useContext,
    useState
} from "react";
import { jsx } from "react/jsx-runtime";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null;
        } catch {
            return null; 
        }
    });

    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );

    const login = (userData, jwtToken) => {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);

        setUser(userData);
        setToken(jwtToken);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
        value={{
            user,
            token,
            login,
            logout,
            isAuthenticated: Boolean(user && token)
        }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);