import PropTypes, { InferProps } from 'prop-types'
import { VisiMisiComp } from './VisiMisiComp'
import { useLegislativeTypeContext } from '../context/LegislativeType'
import { TypeUser } from '../enum/type'
import { LegislativeEnum } from '../enum/legislativeType'

export function PaslonBemCard(
    { visi, misi, imageUrl, isShow, candidateID, nim }: InferProps<typeof PaslonBemCard.propTypes>
) {
    const { voteCandidate } = useLegislativeTypeContext()

    const handleClick = (ev: any) => {
        // voteCandidate(LegislativeEnum.Bem, nim, candidateID)
    }

    return (
        <div className="bg-primary-color p-8 rounded-lg shadow-md flex transition-shadow hover:shadow-primary-color">
            <div className="flex-grow">
                <img src={imageUrl} alt='foto paslon' className="w-96 h-96 object-cover mb-4 rounded-md" />
                <div className="flex justify-between items-center">
                    {
                        isShow &&
                            <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded-md">
                                Pilih
                            </button>
                    }
                    <div className="max-w-md p-8 flex">
                        <VisiMisiComp visi={visi} misi={misi} />
                    </div>
                </div>
            </div>
        </div>
    )
}

PaslonBemCard.propTypes = {
    visi: PropTypes.string.isRequired,
    misi: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    isShow: PropTypes.bool.isRequired,
    candidateID: PropTypes.string.isRequired,
    nim: PropTypes.string.isRequired
}