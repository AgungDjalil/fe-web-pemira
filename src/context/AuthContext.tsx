import axios from "axios"
import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { LoginParams } from "../interface/loginParam"

type AuthContextProviderProps = {
    children: ReactNode
}

type AuthContextType = {
    accessToken: string,
    role: string,
    nim: string,
    isReady: boolean,
    login: (params: LoginParams) => object,
    logout: () => boolean
}

export const AuthContext = createContext({} as AuthContextType)

export function useAuthContext() {
    return useContext(AuthContext)
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [accessToken, setAccessToken] = useState('')
    const [role, setRole] = useState('')
    const [nim, setNim] = useState('')
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedRole = localStorage.getItem('role');
        const storedNim = localStorage.getItem('nim');

        if(storedToken && storedRole && storedNim) {
            setAccessToken(JSON.parse(storedToken))
            setRole(JSON.parse(storedRole))
            setNim(JSON.parse(storedNim));
        }
        
        setIsReady(true)
    }, [setAccessToken, setRole, setNim]);

    async function login(params: LoginParams) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/login/${params.type}`,
                params.type === 'voter' ? 
                    {nim: params.nim, fullName: params.fullName} :
                    {nim: params.nim, password: params.password}
            )

            const { accessToken, role } = response.data

            setAccessToken(accessToken)
            setRole(role)
            setNim(params.nim)
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            localStorage.setItem('role', JSON.stringify(role))
            localStorage.setItem('nim', JSON.stringify(params.nim))

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
            localStorage.removeItem('nim')
            
            setAccessToken('')
            setRole('')
            setNim('')

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
                nim,
                isReady,
                role
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}