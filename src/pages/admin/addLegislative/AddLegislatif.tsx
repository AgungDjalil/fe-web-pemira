import { Await, NavLink, defer, useLoaderData, useNavigate, useSearchParams } from "react-router-dom"
import { LoadingComp } from "../../../components/LoadingComp"
import { useAuthContext } from "../../../context/AuthContext"
import { NotFoundPage } from "../../public/NotFoundPage"
import { PaslonBemCard } from "../../../components/PaslonBemCard"
import { getCalonLegislative } from "../../../apis"
import React, { useState } from "react"

export async function loaderAddLegislativeType({ params }: any) {
  const result = getCalonLegislative(params.type)
  return defer({
    dataCalon: result
  })
}

export function AddLegislative() {
  const { nim, role, isReady } = useAuthContext()
  const data: any = useLoaderData()
  const [LegislativeType, setLegislativeType] = useState('bem')
  const navigate = useNavigate()

  const handleOnChangeLegislativeType = (ev: any) => {
    setLegislativeType(ev.target.value)
    navigate(`/admin/legislative/${ev.target.value}`)  
  }

  if (!isReady && !role && !nim)
    return <LoadingComp />

  if (isReady && role !== 'admin')
    return <NotFoundPage />

  return (
    <main>
      <div className="p-4 sm:ml-64">
        <div className="flex my-4">
          <NavLink to={'/admin/create/legislative'} className="focus:outline-none text-white bg-primary-color hover:bg-red-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">daftarkan calon legislative</NavLink>
          <div className="ms-4">
            <select onChange={handleOnChangeLegislativeType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5">
              <option selected>Lihat calon {LegislativeType}</option>
              <option value="bem">Bem</option>
              <option value="dpm">Dpm</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-10 justify-center">
          <React.Suspense
            fallback={<LoadingComp />}
          >
            <Await
              resolve={data.dataCalon}
              errorElement={
                <p>Error loading data!</p>
              }
            >
              {(dataCalon) => (
                dataCalon.map(({ visi, misi, photo, candidateID }: { visi: string, misi: string, photo: string, serialNumber: number, candidateID: string }) => (
                  <div className="flex" key={candidateID}>
                    <PaslonBemCard nim={nim} candidateID={candidateID} visi={visi} misi={misi} imageUrl={photo} isShow={false} />
                  </div>
                ))
              )}
            </Await>
          </React.Suspense>
        </div>
      </div >
    </main>
  )
}