import axios from "axios"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthContextType = {
    accessToken: string,
    role: string,
    nimAdmin: string,
    isReady: boolean,
    login: (nim: string, password: string) => object,
    logout: () => boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [accessToken, setAccessToken] = useState('')
    const [role, setRole] = useState('')
    const [nimAdmin, setNimAdmin] = useState('')
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedRole = localStorage.getItem('role');
        const storedNimAdmin = localStorage.getItem('nimAdmin');

        if(storedToken && storedRole && storedNimAdmin) {
            setAccessToken(JSON.parse(storedToken))
            setRole(JSON.parse(storedRole))
            setNimAdmin(JSON.parse(storedNimAdmin));
        }
        
        setIsReady(true)
    }, []);

    async function login(nim: string, password: string) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login/admin`, 
                {nim, password}
            )

            const { accessToken, role } = response.data

            if(role !== 'admin') throw new Error('Invalid role')

            setAccessToken(accessToken)
            setRole(role)
            setNimAdmin(nim)
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('role', JSON.stringify(role))
            localStorage.setItem('nimAdmin', JSON.stringify(nim))

            return {
                isSuccess: true
            }

        } catch (err: any) {
            const { response } = err
            console.log(err)
            return {
                isSuccess: false,
                message: response.data.message
            }
        }
    }

    function logout(): boolean  {
        try {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('role')
            
            setAccessToken('')
            setRole('')

            return true

        } catch (err) {
            return false
        }
    }

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
                nimAdmin,
                isReady,
                role
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}