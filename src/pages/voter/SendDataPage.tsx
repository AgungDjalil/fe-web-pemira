import { useEffect, useState } from "react";
import { LoadingComp } from "../../components/LoadingComp";
import { useAuthContext } from "../../context/AuthContext";
import { useLegislativeTypeContext } from "../../context/LegislativeType";
import { LegislativeEnum } from "../../enum/legislativeType";
import { useNavigate } from "react-router-dom";
import PropTypes, { InferProps } from 'prop-types';

export function SendDataPage({
    candidateID,
    legislativeType,
    type
}: InferProps<typeof SendDataPage.propTypes>) {

    const { nim, accessToken } = useAuthContext()
    const { voteCandidate } = useLegislativeTypeContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await voteCandidate(
                    type === 'bem' ? LegislativeEnum.Bem : LegislativeEnum.dpm,
                    nim, candidateID, accessToken
                );

                // Setelah request berhasil, arahkan pengguna ke halaman selanjutnya
                if (result && type === 'bem') navigate('/votingDpm');
                if (result && type === 'dpm') navigate('/thanksPage');
            } catch (error) {
                // Handle kesalahan atau tampilkan pesan kesalahan kepada pengguna
                console.error("Error sending data:", error);
            } finally {
                // Set loading ke false setelah permintaan selesai, terlepas dari hasilnya
                setLoading(false);
            }
        }

        // Pemanggilan fungsi fetch
        fetchData();
    }, [type, nim, candidateID, accessToken, voteCandidate, navigate]);

    return (
        <>
            {loading && <LoadingComp />}
        </>
    )
}

SendDataPage.propTypes = {
    candidateID: PropTypes.string.isRequired,
    legislativeType: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}
