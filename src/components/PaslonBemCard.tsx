import { useState } from "react";

import contohCalonBem from '../assets/contoh-calon-bem.jpg'
import itts from '../assets/logo/ITTS.png'

export function PaslonBemCard() {
    const [showVisiMisi, setShowVisiMisi] = useState(false);

    const handleVisiMisiClick = () => {
        setShowVisiMisi(!showVisiMisi);
    };

    return (
        <div className="max-w-md bg-primary-color p-8 rounded-lg shadow-md flex">
            {/* <div className="flex-shrink-0 mr-6 h-max">
                <img src={itts} alt="Logo" className="w- h- object-cover rounded-full" />
            </div> */}
            <div className="flex-grow">
                <img src={contohCalonBem} alt="Photo" className="w-full h-80 object-cover mb-4 rounded-md" />
                <div className="flex justify-between items-center">
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                        Pilih
                    </button>
                    <div className="max-w-md p-8 flex">
                        {/* ... (bagian sebelumnya tetap sama) */}
                        <div className="ml-4">
                            <button
                                className="text-sm text-white underline cursor-pointer"
                                onClick={handleVisiMisiClick}
                            >
                                Lihat Visi Misi
                            </button>
                        </div>
                        {showVisiMisi && (
                            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-white p-8 rounded-lg shadow-md">
                                    {/* Tambahkan konten penjelasan visi misi di sini */}
                                    <p className="text-lg font-semibold mb-4">Visi Misi</p>
                                    <p className="text-gray-700">Penjelasan visi misi tim...</p>
                                    <button
                                        className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:shadow-outline-blue active:bg-slate-700"
                                        onClick={handleVisiMisiClick}
                                    >
                                        Tutup
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}