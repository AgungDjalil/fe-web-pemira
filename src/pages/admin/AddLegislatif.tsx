import { NavLink } from "react-router-dom"
import { LoadingComp } from "../../components/LoadingComp"
import { useAuthContext } from "../../context/AuthContext"
import { NotFoundPage } from "../public/NotFoundPage"
import axios from "axios"
import { ImageDisplay } from "../../components/ImageDisplay"

export function AddLegislative() {
    const { role, isReady } = useAuthContext()

    if (!isReady && !role)
        return <LoadingComp />
    
    if (isReady && role !== 'admin')
        return <NotFoundPage />
        
    return (
        <div className="p-4 sm:ml-64">
            <ImageDisplay />
            <div className="flex my-4">
                <NavLink to={'/admin/create/legislative'} className="focus:outline-none text-white bg-primary-color hover:bg-red-400 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">daftarkan calon legislative</NavLink>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nomor urut calon
                            </th>
                            <th scope="col" className="px-6 py-3">
                                visi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                misi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                dibuat pada
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-700 border-b">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-gray-700 border-b">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                        <tr className="bg-gray-700 border-b">
                            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}