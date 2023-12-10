import { useEffect } from "react"
import { useLegislativeTypeContext } from "../../../context/LegislativeType"
import dpm from '../../../assets/logo/DPM.png'
import { useAuthContext } from "../../../context/AuthContext"
import { LoadingComp } from "../../../components/LoadingComp"
import { NotFoundPage } from "../NotFoundPage"
import { getCalonLegislative } from "../../../apis"
import { Await, defer, useLoaderData } from "react-router-dom"
import React from "react"
import { ParamsMapCalonLegislative } from "../../../interface/paramsMapCalonLegislative"
import { PaslonCard } from "../../../components/PaslonCard"

export async function loaderVotingDpm() {
    const result = await getCalonLegislative('dpm')
    return defer({
        calonDpm: result
    })
}

export function VotingDpm() {
    const { role, isReady } = useAuthContext()
    const { setNavbarLogo } = useLegislativeTypeContext()
    const data: any = useLoaderData()

    useEffect(() => {
        setNavbarLogo(dpm)
    }, [setNavbarLogo])

    if (!role && !isReady)
        return <LoadingComp />

    if (role !== 'voter' && isReady)
        return <NotFoundPage />

    return (
        <main className='flex flex-wrap gap-14 justify-center'>
            <React.Suspense
                fallback={<LoadingComp />}
            >
                <Await
                    resolve={data.calonDpm}
                    errorElement={
                        <p>error loading data!</p>
                    }
                >
                    {
                        (calonDpm) => (
                            calonDpm.map(({ namaKetua, visi, misi, photo, candidateID, namaWakil, namaCalon }: ParamsMapCalonLegislative) => (
                                <PaslonCard
                                    key={candidateID}
                                    namaCalon={namaCalon ? namaCalon : ''}
                                    namaKetua={namaKetua ? namaKetua : ''}
                                    namaWakil={namaWakil ? namaWakil : ''}
                                    type="dpm"
                                    visi={visi} misi={misi}
                                    imageUrl={photo}
                                    candidateID={candidateID}
                                    isShow={true}
                                />
                            ))
                        )
                    }
                </Await>
            </React.Suspense>
        </main>
    )
}