import axios from "axios"
import { ReactNode, useContext, createContext, useState } from "react"
import { LegislativeEnum } from "../enum/legislativeType"

type LegislativeTypeProvider = {
    children: ReactNode
}

type LegislativeType = {
    createCalonLegislative: (dataForm: any) => Promise<boolean>,
    voteCandidate: (type: LegislativeEnum, nim: string, candidateID: string) => void
}

export const LegislativeTypeContext = createContext({} as LegislativeType)

export function useLegislativeTypeContext() {
    return useContext(LegislativeTypeContext)
}

export function LegislativeTypeProvider({ children }: LegislativeTypeProvider) {

    async function voteCandidate(type: LegislativeEnum, nim: string, candidateID: string) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/polling/${type}`,
                {nim, candidateID}
            )

            console.log(response)

        } catch (err) {
            throw err
        }
    }

    async function createCalonLegislative(dataForm: any): Promise<boolean> {
        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/candidate/create`,
                dataForm
            )

            return true

        } catch (err) {
            console.log(err)
            return false
        }
    }

    return (
        <LegislativeTypeContext.Provider
            value={{
                createCalonLegislative,
                voteCandidate
            }}
        >
            {children}
        </LegislativeTypeContext.Provider>
    )
}