import axios from "axios"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthContextType = {
    accessToken: string,
    role: string,
    isReady: boolean,
    login: (nim: string, password: string) => object
}

export const AuthContext = createContext({} as AuthContextType)

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [accessToken, setAccessToken] = useState(String)
    const [role, setRole] = useState(String)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedToken && storedRole) {
            setAccessToken(JSON.parse(storedToken))
            setRole(JSON.parse(storedRole))
        }

        setIsReady(true)

    }, []);

    async function login(nim: string, password: string) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}api/auth/login/admin`, 
                {nim, password}
            )

            const { accessToken, role } = response.data

            if(role !== 'admin')
                throw new Error('Invalid role')

            setAccessToken(accessToken)
            setRole(role)
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('role', role)
            
            return {
                isSuccess: true
            }

        } catch (err: any) {
            const { response } = err

            return {
                isSuccess: false,
                message: response.data.message
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                isReady,
                role
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}