import PropTypes, { InferProps } from 'prop-types';
import { useLegislativeTypeContext } from '../context/LegislativeType';
import { useNavigate } from 'react-router-dom';
import { LegislativeEnum } from '../enum/legislativeType';
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

export function ConfirmPopup({
    type,
    candidateID,
    namaKetua,
    namaWakil,
    namaCalon,
    setIsOpen
}: InferProps<typeof ConfirmPopup.propTypes>) {
    const { voteCandidate } = useLegislativeTypeContext()
    const { accessToken, nim } = useAuthContext()
    const [isSend, setIsSend] = useState(false)

    const navigate = useNavigate()

    const handleClickConfirm = async () => {
        setIsSend(true);

        const isSuccess = await voteCandidate(
            type === 'bem' ? LegislativeEnum.Bem : LegislativeEnum.dpm,
            nim, candidateID, accessToken
        );

        if (isSuccess && type === 'bem') navigate('/votingDpm');
        
        if (isSuccess && type === 'dpm') navigate('/thanksPage');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
            <div className="bg-white rounded-lg overflow-hidden w-96">
                <div className="px-6 py-4">
                    <div className="flex justify-between items-center">
                        <svg className="mx-auto mb-4 text-gray-500 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <button
                            className="text-gray-500 hover:text-gray-700 -mt-14 -mr-2 focus:outline-none"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>
                    <p className="mt-4 mb-5 text-lg font-normal text-gray-500 text-center">
                        yakin memilih
                        {
                            type === 'bem' ?
                                (
                                    ' pasangan ' + namaKetua + ' dan ' + namaWakil
                                ) :
                                (
                                    ' ' + namaCalon
                                )
                        }?
                    </p>
                </div>
                <div className="bg-gray-100 px-6 py-4 flex justify-center">
                    <button
                        className="bg-primary-color text-white px-4 py-2 rounded mr-2"
                        onClick={handleClickConfirm}
                        disabled={isSend}
                    >
                        Ya!!
                    </button>
                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                        onClick={() => setIsOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

ConfirmPopup.propTypes = {
    type: PropTypes.string.isRequired,
    candidateID: PropTypes.string.isRequired,
    namaWakil: PropTypes.string.isRequired,
    namaKetua: PropTypes.string.isRequired,
    namaCalon: PropTypes.string.isRequired,
    setIsOpen: PropTypes.func.isRequired
};
