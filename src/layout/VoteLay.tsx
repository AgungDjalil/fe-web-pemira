import bgTexturePrimary from '../assets/bg-texture/bg-primary.png'
import pemira from '../assets/logo/pemira.png'
import panwaslu from '../assets/logo/panwaslu.png'
import kpum from '../assets/logo/KPUM .png'
import itts from '../assets/logo/ITTS.png'
import { Outlet } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { LoadingComp } from '../components/LoadingComp'
import { NotFoundPage } from '../pages/voter/NotFoundPage'
import { useLegislativeTypeContext } from '../context/LegislativeType'

export function VoteLay() {
    const { role, isReady } = useAuthContext()
    const { navbarLogo } = useLegislativeTypeContext()

    if(!role && !isReady && !navbarLogo)
        return <LoadingComp />

    if(role !== 'voter' && isReady)
        return <NotFoundPage />
        
    return (
        <div className='h-max'
            style={{ backgroundImage: `url('${bgTexturePrimary}')`, backgroundSize: 'cover' }}
        >
            <div className='flex justify-between mx-14'>
                <div>
                    <img alt='logo itts' className='mt-7' src={itts} width={120} height={100} />
                </div>
                <h1 className='self-center text-3xl font-extralight'>Pilihanmu menentukan masa depan kampus</h1>
                <div className='mt-14'>
                    <img src={navbarLogo} alt='logo bem' width={100} />
                </div>
            </div>

            <Outlet />

            <div className='flex justify-center gap-6'>
                <div className='mt-16 mb-16'>
                    <img src={kpum} alt='logo kpum' />
                </div>
                <div className='mt-16 mb-16 border-slate-400 border-l-2 border-r-2'>
                    <img src={pemira} alt='logo pemira' />
                </div>
                <div className='mt-16 mb-16'>
                    <img src={panwaslu} alt='logo panwaslu' />
                </div>
            </div>
        </div>
    )
}