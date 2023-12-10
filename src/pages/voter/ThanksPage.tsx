import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import bem from '../../assets/logo/BEM.png'
import dpm from '../../assets/logo/DPM.png'
import kpum from '../../assets/logo/KPUM .png'
import panwaslu from '../../assets/logo/panwaslu.png'
import pemira from '../../assets/logo/pemira.png'
// import itts from '../../assets/logo/ITTS.png'

export function ThanksPage() {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(40);

    useEffect(() => {
        logout();
        
        const timeoutId = setTimeout(() => {
            setSeconds((prevSeconds) => prevSeconds - 1);

          if (seconds === 0) {
            navigate("/login");
          }
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [logout, navigate, seconds]);

    return (
        <div className="h-screen flex justify-center items-center bg-primary-color flex-wrap">
            <div>
                <div className="flex justify-center gap-4 p-4 my-10 bg-slate-100 rounded-full">
                    <img src={bem} alt="" width={130} className="m-2" />
                    <img src={kpum} alt="" width={130} className="m-2" />
                    <img src={panwaslu} alt="" width={130} className="m-2" />
                    <img src={pemira} alt="" width={140} className="m-2" />
                    <img src={dpm} alt="" width={130} className="m-2" />
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white">
                        Terima Kasih Telah menggunakan hak pilihmu
                    </h1>
                    <p className="text-2xl text-white my-10">Halaman akan dialihkan dalam {seconds} detik</p>
                </div>
            </div>
        </div>

    );
}
