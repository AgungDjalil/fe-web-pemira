import axios from "axios"
import PropTypes, { InferProps } from "prop-types"
import { useState } from "react"
import { ConfirmPopup } from "./ConfirmComp"

export function fetchVerifyApi(voterID: string, nim: string, accessToken: string) {
    try {
        axios.post(
            `${process.env.REACT_APP_API_URL}/api/voter/${voterID}`,
            { nim: nim },
            { headers: { 'Authorization': `Bearer ${accessToken}` } }
        )

        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export function fetchDeleteApi(voterID: string, accessToken: string, nim: string) {
    console.log(`${process.env.REACT_APP_API_URL}/api/polling/voter/${voterID}/delete`)
    try {
        axios.delete(
            `${process.env.REACT_APP_API_URL}/api/polling/voter/${voterID}/delete`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                data: { nim: nim }
            },
        )
    } catch (err) {
        console.log(err);
    }
}

export function TableComp({
    fullName,
    nim,
    joinAt,
    voterID
}: InferProps<typeof TableComp.propTypes>) {
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState(String)

    const hanldeButtonVerify = () => {
        setIsOpen(true)
        setType('voter')
    }

    const handleButtonDelete = () => {
        setIsOpen(true)
        setType('delete')
    }

    return (
        <div className="w-full text-sm text-left text-gray-500">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <th scope="col" className="px-6 w-72 py-3 bg-gray-50">
                            Nama Lengkap
                        </th>
                        <th scope="col" className="px-6 py-3 w-52">
                            Nim
                        </th>
                        <th scope="col" className="px-6 py-3 bg-gray-50">
                            Create At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-gray-200">
                        <th scope="row" className="px-6 py-4 w-72 font-medium text-gray-900 flex flex-wrap bg-gray-50">
                            {fullName}
                        </th>
                        <td className="px-6 py-4 w-52">
                            {nim}
                        </td>
                        <td className="px-6 py-4 bg-gray-50">
                            {joinAt}
                        </td>
                        <td className="text-white flex justify-center">
                            <button onClick={hanldeButtonVerify} className="p-2 bg-green-500 rounded-full">verify</button>
                            <button onClick={handleButtonDelete} className="p-2 ms-2 bg-red-500 rounded-full">delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            {
                isOpen &&
                <ConfirmPopup
                    candidateID=""
                    namaCalon=""
                    namaKetua=""
                    namaWakil=""
                    nimVoter={nim}
                    setIsOpen={setIsOpen}
                    type={type}
                    voterID={voterID}
                />
            }
        </div>
    )
}

TableComp.propTypes = {
    fullName: PropTypes.string.isRequired,
    nim: PropTypes.string.isRequired,
    joinAt: PropTypes.string.isRequired,
    voterID: PropTypes.string.isRequired
}