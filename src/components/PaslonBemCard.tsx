import contohCalonBem from '../assets/contoh-calon-bem.jpg'
import { VisiMisiComp } from './VisiMisiComp'

export function PaslonBemCard() {

    return (
        <div className="bg-primary-color p-8 rounded-lg shadow-md flex transition-shadow hover:shadow-primary-color">
            {/* <div className="flex-shrink-0 mr-6 h-max">
                <img src={itts} className="w- h- object-cover rounded-full" />
            </div> */}
            <div className="flex-grow">
                <img src={contohCalonBem} alt='foto paslon' className="w-full h-80 object-cover mb-4 rounded-md" />
                <div className="flex justify-between items-center">
                    <button className="bg-black text-white px-4 py-2 rounded-md">
                        Pilih
                    </button>
                    <div className="max-w-md p-8 flex">
                        <VisiMisiComp />
                    </div>
                </div>
            </div>
        </div>
    )
}