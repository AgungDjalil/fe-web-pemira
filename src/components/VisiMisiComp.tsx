import PropTypes, { InferProps } from "prop-types";
import { useState } from "react";

export function VisiMisiComp({
    visi,
    misi
}: InferProps<typeof VisiMisiComp.propTypes>) {
    const [showVisiMisi, setShowVisiMisi] = useState(false);

    const handleVisiMisiClick = () => {
        setShowVisiMisi(!showVisiMisi);
    };

    return (
        <>
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
                <div className="bg-white p-8 rounded-lg shadow-md" style={{ margin: '0 20px' }}>
                    <div className="text-center">
                        <p className="text-lg font-semibold">Visi</p>
                        <p className="text-gray-700 mb-5">{visi}</p>
                        <p className="text-lg font-semibold">Misi</p>
                        <p className="text-gray-700 mb-5">{misi}</p>
                    </div>
                    <button
                        className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 focus:outline-none focus:shadow-outline-blue active:bg-slate-700"
                        onClick={handleVisiMisiClick}
                    >
                        Tutup
                    </button>
                </div>
            </div>
            )}
        </>
    )
}

VisiMisiComp.propTypes = {
    visi: PropTypes.string.isRequired,
    misi: PropTypes.string.isRequired
}