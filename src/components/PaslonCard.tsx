import PropTypes, { InferProps } from 'prop-types'
import { VisiMisiComp } from './VisiMisiComp'
import { ConfirmPopup } from './ConfirmComp'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PollingComp } from './PollingComp'

export function PaslonCard(
    { visi, misi, imageUrl, isShow, candidateID, type, namaKetua, namaWakil, namaCalon }: InferProps<typeof PaslonCard.propTypes>
) {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const handleUpdateButton = () => navigate(`/admin/edit/legislative/${candidateID}`)

    return (
        <div className="bg-primary-color p-8 rounded-lg shadow-md flex transition-shadow hover:shadow-primary-color">
            <div className="flex-grow">
                <img src={imageUrl} alt='foto paslon' className="w-96 h-96 object-cover mb-4 rounded-md" />
                <div className="flex justify-between items-center">
                    {
                        isShow &&
                        <button onClick={() => setIsOpen(true)} className="bg-black text-white px-4 py-2 rounded-md">
                            Pilih
                        </button>
                    }
                    {
                        !isShow &&
                        <button onClick={handleUpdateButton} className="bg-black text-white px-4 py-2 rounded-md">
                            edit
                        </button>
                    }
                    <div className="max-w-md p-8 flex">
                        <VisiMisiComp visi={visi} misi={misi} />
                    </div>
                    {
                        isOpen &&
                            <ConfirmPopup
                                nimVoter=''
                                voterID=''
                                setIsOpen={setIsOpen}
                                namaCalon={namaCalon ? namaCalon : ''}
                                namaKetua={namaKetua ? namaKetua : ''}
                                namaWakil={namaWakil ? namaWakil : ''}
                                candidateID={candidateID}
                                type={type}
                            />
                    }
                </div>
                {
                    !isShow &&
                    <PollingComp candidateID={candidateID} type={type} />
                }
            </div>
        </div>
    )
}

PaslonCard.propTypes = {
    visi: PropTypes.string.isRequired,
    misi: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    candidateID: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    namaKetua: PropTypes.string.isRequired,
    namaWakil: PropTypes.string.isRequired,
    namaCalon: PropTypes.string.isRequired
}