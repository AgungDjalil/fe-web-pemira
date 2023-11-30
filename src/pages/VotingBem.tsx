import itts from '../assets/logo/ITTS.png'
import bem from '../assets/logo/BEM.png'

export function VotingBem() {
    return (
        <div>
            <div className='flex'>
                <img src={itts} width={150} height={100}/>
                Pilihanmu menentukan masa depan kampus
                <img src={bem} width={150} height={100}/>
            </div>
        </div>
    )
}