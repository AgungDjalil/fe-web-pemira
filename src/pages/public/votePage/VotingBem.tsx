import { Await, defer, useLoaderData } from "react-router-dom"
import { getCalonLegislative } from "../../../apis"
import { LoadingComp } from "../../../components/LoadingComp"
import React from "react"
import { PaslonBemCard } from "../../../components/PaslonBemCard"
import { useAuthContext } from "../../../context/AuthContext"
import { NotFoundPage } from "../NotFoundPage"

export async function loaderVotingBem() {
    const result = getCalonLegislative('bem')
    return defer({
        calonBem: result
    })
}

export function VotingBem() {
    const { nim, role, isReady } = useAuthContext()
    const data: any = useLoaderData()

    if(!nim && !role && !isReady)
        return <LoadingComp />

    if(isReady && role !== 'voter')
        return <NotFoundPage />

    return (
        <main>
            <div className='flex flex-wrap gap-14 justify-center'>
                <React.Suspense
                    fallback={<LoadingComp />}
                >
                    <Await
                        resolve={data.calonBem}
                        errorElement={
                            <p>Error loading data</p>
                        }
                    >
                        {(dataCalon) => (
                            dataCalon.map(({ visi, misi, photo, candidateID }: { visi: string, misi: string, photo: string, serialNumber: number, candidateID: string }) => (
                                <div className="flex" key={candidateID}>
                                    <PaslonBemCard nim={nim} candidateID={candidateID} visi={visi} misi={misi} imageUrl={photo} isShow={true} />
                                </div>
                            ))
                        )}
                    </Await>
                </React.Suspense>
            </div>
        </main>
    )
}