import loginTexture from '../../../assets/bg-texture/bg-texture-login.png';
import kpum from '../../../assets/logo/KPUM .png'
import panwaslu from '../../../assets/logo/panwaslu.png'
import pemira from '../../../assets/logo/pemira.png'
import itts from '../../../assets/logo/ITTS.png'
import { useAuthContext } from '../../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypeUser } from '../../../enum/type';

export function Login() {
    const { login } = useAuthContext()
    const [fullName, setFullName] = useState('')
    const [nim, setNim] = useState('')
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const handleSubmit = async (ev: any) => {
        ev.preventDefault()
        const result: any = await login({ nim, fullName, type: TypeUser.Voter, password: '' })

        if (result.isSuccess)
            navigate('/votingBem')

        if (!result.isSuccess)
            setError(result.message)
    }
    
    return (
        <div
            className="bg-cover bg-center h-screen flex items-center"
            style={{
                backgroundImage: `url(${loginTexture})`,
            }}
        >
            <div className="absolute -top-7 right-0 p-4">
                <img src={itts} alt='logo itts' />
            </div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full rounded-lg max-w-md bg-primary-color shadow-xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='bg-white rounded-xl flex p-2 gap-4 mb-10'>
                            <div>
                                <img src={kpum} width={110} height={110} alt='logo kpum' />
                            </div>
                            <div>
                                <img src={pemira} width={130} height={120} alt='logo pemira' />
                            </div>
                            <div>
                                <img src={panwaslu} width={110} height={110} alt='logo panwaslu' />
                            </div>
                        </div>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="fullName" className="text-white block mb-2 text-sm font-medium">Nama Lengkap</label>
                                <input onChange={ev => setFullName(ev.target.value)} type="text" name='fullName' className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Susi Susanti" required={true} />
                            </div>
                            <div>
                                <label htmlFor="NIM" className="text-white block mb-2 text-sm font-medium">
                                    NIM
                                    {
                                        error &&
                                        <span className='ms-4 p-1.5 text-red-700 rounded-lg bg-white'>nim telah digunakan!!</span>
                                    }
                                </label>
                                <input onChange={ev => setNim(ev.target.value)} type="text" name="NIM" placeholder="xxxxxxxxxx" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} />
                            </div>
                            <button type="submit" className="w-full text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Masuk</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
