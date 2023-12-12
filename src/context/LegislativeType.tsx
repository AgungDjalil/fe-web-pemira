import axios from "axios"
import { ReactNode, useContext, createContext, useState } from "react"
import { LegislativeEnum } from "../enum/legislativeType"

type LegislativeTypeProviderProps = {
    children: ReactNode
}

type LegislativeType = {
    navbarLogo: string,
    setNavbarLogo: React.Dispatch<React.SetStateAction<string>>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    createCalonLegislative: (dataForm: any, accessToken: string) => Promise<boolean>,
    voteCandidate: (type: LegislativeEnum, nim: string, candidateID: string, accessToken: string) => Promise<boolean>,
    updateCandidate: ((dataForm: any, accessToken: string) => Promise<boolean>)
}

export const LegislativeTypeContext = createContext({} as LegislativeType)

export function useLegislativeTypeContext() {
    return useContext(LegislativeTypeContext)
}

export function LegislativeTypeProvider({ children }: LegislativeTypeProviderProps) {
    const [navbarLogo, setNavbarLogo] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    async function updateCandidate(dataForm: any, accessToken: string) {
        try {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/api/candidate/update`,
                dataForm,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )

            return true

        } catch (err: any) {
            const { response } = err
            console.log(response)
            return false
        }
    }

    async function voteCandidate(type: LegislativeEnum, nim: string, candidateID: string, accessToken: string) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/polling/${type}`,
                {voterNim: nim, candidateID},
                {
                    headers: { Authorization: `Bearer ${accessToken}`}
                }
            )

            console.log(response)

            return true

        } catch (err) {
            console.log(err)
            return false
        }
    }

    async function createCalonLegislative(dataForm: any, accessToken: string): Promise<boolean> {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/candidate/create`,
                dataForm,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            )

            return true

        } catch (err: any) {
            const { response } = err
            console.log(response)
            return false
        }
    }

    return (
        <LegislativeTypeContext.Provider
            value={{
                setIsOpen, isOpen,
                navbarLogo, setNavbarLogo,
                createCalonLegislative,
                updateCandidate,
                voteCandidate
            }}
        >
            {children}
        </LegislativeTypeContext.Provider>
    )
}