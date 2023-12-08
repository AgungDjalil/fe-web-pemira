import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/public/Login";
import { VotingBem } from "../pages/public/VotingBem";
import { LoginAdmin } from "../pages/admin/LoginAdmin";
import { SideBarAdmin } from "../layout/SideBarAdmin";
import { AddLegislative } from "../pages/admin/AddLegislatif";
import { CreateLegislative } from "../pages/admin/CreateLegislative";
import { NotFoundPage } from "../pages/public/NotFoundPage";

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
                element : <SideBarAdmin />,
                children : [
                    {
                        path : '/admin/add/legislative',
                        element : <AddLegislative />
                    },
                    {
                        path : '/admin/create/legislative',
                        element : <CreateLegislative />
                    }
                ]
            },
        ],
        errorElement : <NotFoundPage />
    }
])