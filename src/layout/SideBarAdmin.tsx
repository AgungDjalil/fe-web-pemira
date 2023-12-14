import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { LoadingComp } from "../components/LoadingComp";
import { NotFoundPage } from "../pages/voter/NotFoundPage";
import pollingLogo from "../assets/icon/polling-icon.svg"
import voterPage from "../assets/icon/voter-icon.svg"
import legisLativeIcon from "../assets/icon/legislative-icon.svg"
import adminIcon from "../assets/icon/admin-icon.svg"
import logoutIcon from "../assets/icon/logout-icon.svg"

export function SideBarAdmin() {
    const { logout, isReady, role } = useAuthContext()
    const navigate = useNavigate()

    if (!isReady && !role)
        return <LoadingComp />

    if (isReady && role !== 'admin')
        return <NotFoundPage />

    const handleClick = (e: any) => {
        const isSuccess = logout()

        if (isSuccess)
            navigate('/login/admin')

        if (!isSuccess)
            e.preventDefault()
    }

    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-red-600">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <NavLink to={'/admin/legislative/bem'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <img src={legisLativeIcon} width={27} alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">legislative</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/add'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <img src={adminIcon} width={27} alt="" />
                                <span className="flex-1 ms-3 whitespace-nowrap">Admin</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/polling/bem'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <img src={pollingLogo} width={27} alt="" />
                                <span className="flex-1 ms-2 whitespace-nowrap">Polling</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/admin/voter/page/1/search/null'} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                                <img src={voterPage} width={27} alt="" />
                                <span className="flex-1 ms-2 whitespace-nowrap">Voter</span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleClick} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <img src={logoutIcon} width={27} alt="" />
                                <span className="flex-1 ms-2 whitespace-nowrap">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            <Outlet />
        </>
    )
}