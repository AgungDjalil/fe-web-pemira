import { LoadingComp } from "../../components/LoadingComp"
import { useAuthContext } from "../../context/AuthContext"

export function HomeAdmin() {
    const { role, isReady } = useAuthContext()

    if (!isReady && !role)
        return <LoadingComp />

    if (isReady && role === 'admin')
        return <h1>page not found</h1>

    return (
        <>
            <div className="p-4 sm:ml-64">
                <h1>h2looo</h1>
            </div>
        </>
    )
}