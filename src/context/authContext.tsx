import { createContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContexctProps = {
    id: number,
    token: string,
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

type AuthProviderProps = {
    children: ReactNode,
    initialUser: AuthContexctProps | null
}
export const AuthContext = createContext<AuthProviderProps>({} as AuthProviderProps)

const AuthProvider = ({children}:AuthContexctProps) => {
    const [token, setToken] = useState('')

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('https://localhost:3333/session', {
                email,
                password
            })
            setToken(response.data.token)
            await AsyncStorage.setItem('token', response.data.token)
        } catch (error) {
            
        }
    }

}

const logout = async() => {}


export default AuthProvider;