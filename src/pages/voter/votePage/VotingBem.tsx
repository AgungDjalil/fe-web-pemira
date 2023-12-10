import { Await, defer, useLoaderData } from "react-router-dom"
import { getCalonLegislative } from "../../../apis"
import { LoadingComp } from "../../../components/LoadingComp"
import React, { useEffect } from "react"
import { PaslonCard } from "../../../components/PaslonCard"
import { useAuthContext } from "../../../context/AuthContext"
import { NotFoundPage } from "../NotFoundPage"
import { useLegislativeTypeContext } from "../../../context/LegislativeType"
import bem from '../../../assets/logo/BEM.png'
import { ParamsMapCalonLegislative } from "../../../interface/paramsMapCalonLegislative"

export async function loaderVotingBem() {
    const result = getCalonLegislative('bem')
    return defer({
        calonBem: result
    })
}

export function VotingBem() {
    const { role, isReady } = useAuthContext()
    const { setNavbarLogo } = useLegislativeTypeContext()
    const data: any = useLoaderData()

    useEffect(() => {
        setNavbarLogo(bem)
    }, [setNavbarLogo])

    if (!role && !isReady)
        return <LoadingComp />

    if (isReady && role !== 'voter')
        return <NotFoundPage />

    return (
        <main className='flex flex-wrap gap-14 justify-center'>
            <React.Suspense
                fallback={<LoadingComp />}
            >
                <Await
                    resolve={data.calonBem}
                    errorElement={
                        <p>Error loading data</p>
                    }
                >
                    {(calonBem) => (
                        calonBem.map(({ visi, misi, photo, candidateID, namaKetua, namaWakil, namaCalon }: ParamsMapCalonLegislative) => (
                            <PaslonCard
                                key={candidateID}
                                namaCalon={namaCalon ? namaCalon : ''}
                                namaKetua={namaKetua ? namaKetua : ''}
                                namaWakil={namaWakil ? namaWakil : ''}
                                type="bem"
                                candidateID={candidateID}
                                visi={visi} misi={misi}
                                imageUrl={photo}
                                isShow={true}
                            />
                        ))
                    )}
                </Await>
            </React.Suspense>
        </main>
    )
}