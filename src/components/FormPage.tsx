import React, { useState } from "react"
import { useLegislativeTypeContext } from "../context/LegislativeType"
import { useAuthContext } from "../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import PropsTypes, { InferProps } from "prop-types"
import { LoadingComp } from "./LoadingComp"
import { NotFoundPage } from "../pages/voter/NotFoundPage"

export function FormPage({ 
    pageType 
}: InferProps<typeof FormPage.propTypes>) {
    const [legislativeType, setLegislativeType] = useState('')
    const [photoFile, setPhotoFile] = useState<File | null>()
    const [serialNumber, setSerialNumber] = useState(Number)
    const [namaKetua, setNamaKetua] = useState('')
    const [namaWakil, setNamaWakil] = useState('')
    const [namaCalon, setNamaCalon] = useState('')
    const [nimKetua, setNimKetua] = useState('')
    const [nimWakil, setNimWakil] = useState('')
    const [nimCalon, setNimCalon] = useState('')
    const [misi, setMisi] = useState('')
    const [visi, setVisi] = useState('')

    const { createCalonLegislative, updateCandidate } = useLegislativeTypeContext()
    const { nim, accessToken, role, isReady } = useAuthContext()

    const navigate = useNavigate()
    const { candidateID } = useParams()

    if(!nim && !accessToken && !role && !isReady) return <LoadingComp />

    if(role !== 'admin' && isReady) return <NotFoundPage />

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file)
            setPhotoFile(file);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const dataForm = new FormData()

        if (photoFile) dataForm.append('file', photoFile)
        if(candidateID) dataForm.append('candidateID', candidateID)

        if(legislativeType === 'bem') {
            dataForm.append('namaKetua', namaKetua)
            dataForm.append('namaWakil', namaWakil)
            dataForm.append('nimKetua', nimKetua)
            dataForm.append('nimWakil', nimWakil)
        } 

        if(legislativeType === 'dpm') {
            dataForm.append('namaCalon', namaCalon)
            dataForm.append('nimWakil', nimCalon)
        }

        dataForm.append('nimAdmin', nim)
        dataForm.append('legislativeType', legislativeType)
        dataForm.append('visi', visi)
        dataForm.append('misi', misi)
        dataForm.append('serialNumber', String(serialNumber))


        const isSuccess = await updateCandidate(dataForm, accessToken)

        if (isSuccess) navigate('/admin/legislative/bem')
    }

    return (
        <div className="p-4 sm:ml-64">
            <form className="max-w-md" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <select defaultValue="null" onChange={e => setLegislativeType(e.target.value)} autoFocus={true} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="null" >Jenis calon</option>
                        <option value="bem">Bem</option>
                        <option value="dpm">Dpm</option>
                    </select>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {
                        legislativeType === 'bem' &&
                            <>
                                <div>
                                    <label htmlFor="namaKetua" className="block mb-2 text-sm font-light">Nama Ketua</label>
                                    <input onChange={ev => setNamaKetua(ev.target.value)} type="text" id="namaKetua" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="udin" />
                                </div>
                                <div>
                                    <label htmlFor="namaWakil" className="block mb-2 text-sm font-light">Nama Wakil</label>
                                    <input onChange={ev => setNamaWakil(ev.target.value)} type="text" id="namaWakil" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="sheila" />
                                </div>
                                <div>
                                    <label htmlFor="nimKetua" className="block mb-2 text-sm font-light">Nim Ketua</label>
                                    <input onChange={ev => setNimKetua(ev.target.value)} type="text" id="nimKetua" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XXXXXXXXX" />
                                </div>
                                <div>
                                    <label htmlFor="nimWakil" className="block mb-2 text-sm font-light">Nim Wakil</label>
                                    <input onChange={ev => setNimWakil(ev.target.value)} type="text" id="nimWakil" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XXXXXXXXXX" />
                                </div>
                            </> 
                    }
                    {
                        legislativeType === 'dpm' &&
                            <>
                                <div>
                                    <label htmlFor="NamaCalon" className="block mb-2 text-sm font-light">Nama Calon</label>
                                    <input onChange={ev => setNamaCalon(ev.target.value)} type="text" id="NamaCalon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="udin" />
                                </div>
                                <div>
                                    <label htmlFor="nimCalon" className="block mb-2 text-sm font-light">Nim Calon</label>
                                    <input onChange={ev => setNimCalon(ev.target.value)} type="text" id="nimCalon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XXXXXXXXXX" />
                                </div>
                            </>
                    }
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <label className="block mb-2 text-sm font-light" htmlFor="file_input">Foto Paslon</label>
                    <input onChange={handleFileChange} className="block w-full p-2 text-sm border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input onChange={e => setSerialNumber(parseInt(e.target.value))} type="text" name="serialNumber" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nomor urut pasangan</label>
                </div>
                <div className="my-4">
                    <label htmlFor="visi" className="block mb-2 text-sm font-light">Visi Paslon</label>
                    <textarea id="visi" onChange={e => setVisi(e.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="tulis visi calon..."></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="misi" className="block mb-2 text-sm font-light">Misi Paslon</label>
                    <textarea id="misi" onChange={e => setMisi(e.target.value)} rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="tulis Misi calon..."></textarea>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>

        </div>
    )
}

FormPage.propTypes = {
    pageType: PropsTypes.string.isRequired
}