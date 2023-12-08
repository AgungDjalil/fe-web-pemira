import axios from "axios"
import { ReactNode, useContext, createContext } from "react"

type LegislativeTypeProvider = {
    children: ReactNode
}

type dataFormParam = {
    nimAdmin: string,
    legislativeType: string,
    photoFile: File | null | undefined,
    serialNumber: number,
    visi: string,
    misi: string
}

type LegislativeType = {
    createCalonLegislative: (dataForm: any) => void
}


export const LegislativeTypeContext = createContext({} as LegislativeType)

export function useLegislativeTypeContext() {
    return useContext(LegislativeTypeContext)
}


export function LegislativeTypeProvider({ children }: LegislativeTypeProvider) {
    
    async function createCalonLegislative(dataForm: any) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/candidate/create`,
                dataForm
            )

            console.log(response)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <LegislativeTypeContext.Provider
            value={{ 
                createCalonLegislative
            }}
        >
            { children }
        </LegislativeTypeContext.Provider>
    )
}