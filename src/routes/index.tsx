import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/public/Login";
import { VotingBem } from "../pages/public/VotingBem";
import { LoginAdmin } from "../pages/admin/LoginAdmin";
import { HomeAdmin } from "../pages/admin/Home";
import { SideBarAdmin } from "../layout/SideBarAdmin";

export const router = createBrowserRouter([
    {
        children : [
            {
                path : "/login",
                element : <Login />
            },
            {
                path : '/votingBem',
                element : <VotingBem />
            },
            {
                path : "/login/admin",
                element : <LoginAdmin />
            },
            {
                path : '/admin',
                element : <SideBarAdmin />,
                children : [
                    {
                        path : '/admin/home',
                        element : <HomeAdmin />
                    }
                ]
            },
        ],
        errorElement : <h1>halaman tidak ditemukan</h1>
    }
])