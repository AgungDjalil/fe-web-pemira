import PropTypes, { InferProps } from "prop-types";
import { useEffect, useState } from "react";
import { getVoteCount } from "../apis";
import { useAuthContext } from "../context/AuthContext";

export function PollingComp({
    candidateID,
    type
}: InferProps<typeof PollingComp.propTypes>) {
    const [percentage, setPercentage] = useState<string>("");
    const { accessToken } = useAuthContext();
    const [totalSuara, setTotalSuara] = useState()
    const [count, setCount] = useState()

    useEffect(() => {
        const fetchVoteCount = async () => {
            try {
                const data = await getVoteCount(candidateID, accessToken, type);
                const formattedPercentage = Number(data.percentage).toFixed(2);
                setPercentage(formattedPercentage);
                setTotalSuara(data.totalSuara)
                setCount(data.count)

            } catch (error) {
                console.error("Error fetching vote count:", error);
            }
        };

        fetchVoteCount();
    }, [candidateID, accessToken, type]);

    return (
        <div>
            <div className="flex items-center mt-4">
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded">
                    <div className="h-5 bg-black rounded" style={{ width: `${percentage}%` }}></div>
                </div>
                <span className="font-medium text-2xl text-white">{percentage}%</span>
            </div>
            <div className="ms-4 text-lg font-bold text-white mt-5">
                mendapatkan {count} suara dari {totalSuara} Pemilih
            </div>
        </div>
    );
}

PollingComp.propTypes = {
    candidateID: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};
