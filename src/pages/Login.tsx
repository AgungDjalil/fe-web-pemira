import loginTexture from '../assets/bg-texture/bg-texture-login.png';
import kpum from '../assets/logo/KPUM .png'
import panwaslu from '../assets/logo/panwaslu.png'
import pemira from '../assets/logo/pemira.png'
import itts from '../assets/logo/ITTS.png'

export function Login() {
    return (
        <div
            className="bg-cover bg-center h-screen flex items-center"
            style={{
                backgroundImage: `url(${loginTexture})`,
            }}
        >
                  <img
        src={itts}
        alt="ITTS Logo"
        className="absolute -top-7 right-0 p-4"
      />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <div className="w-full rounded-lg max-w-md bg-primary-color shadow-xl">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <div className='bg-white rounded-xl flex p-2 gap-4 mb-10'>
                            <img src={kpum} width={110} height={110}/>
                            <img src={pemira} width={110} height={110} />
                            <img src={panwaslu} width={110} height={110} />
                        </div>
                        <form className="space-y-6" action="#">
                            <div>
                                <label htmlFor="fullName" className="text-white block mb-2 text-sm font-medium">Nama Lengkap</label>
                                <input type="text" name='fullName' id='fullName' className="border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Susi Susanti" required={true} />
                            </div>
                            <div>
                                <label htmlFor="NIM" className="text-white block mb-2 text-sm font-medium">NIM</label>
                                <input type="text" name="NIM" id="NIM" placeholder="xxxxxxxxxx" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} />
                            </div>
                            <button type="submit" className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Masuk</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
