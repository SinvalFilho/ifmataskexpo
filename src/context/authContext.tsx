import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
    token: string | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

type AuthProviderProps = {
    children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getTokenStorage = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("taskIFMA@2024");
                if (storedToken) {
                    setToken(storedToken);
                }
            } catch (error) {
                console.error("Error retrieving token from storage:", error);
            } finally {
                setIsLoading(false);
            }
        };

        getTokenStorage();
    }, []);

    const login = async (email: string, password: string) => {
        setError(null);
        try {
            const response = await axios.post("http://10.0.2.2:3333/session", {
                email,
                password,
            });
            const userToken = response.data.token;
            setToken(userToken);
            await AsyncStorage.setItem("taskIFMA@2024", userToken);
        } catch (err: any) {
            setError("Falha no login. Verifique suas credenciais.");
            console.error("Login error:", err);
        }
    };

    const logout = async () => {
        try {
            await axios.delete("http://10.0.2.2:3333/session", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setToken(null);
            await AsyncStorage.removeItem("taskIFMA@2024");
        } catch (error) {
            setError("Erro ao realizar logout. Tente novamente.");
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ token, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
