import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/public/auth/Login";
import { VotingBem, loaderVotingBem } from "../pages/public/votePage/VotingBem";
import { LoginAdmin } from "../pages/admin/auth/LoginAdmin";
import { SideBarAdmin } from "../layout/SideBarAdmin";
import { AddLegislative } from "../pages/admin/addLegislative/AddLegislatif";
import { CreateLegislative } from "../pages/admin/addLegislative/CreateLegislative";
import { NotFoundPage } from "../pages/public/NotFoundPage";
import { loaderAddLegislativeType } from '../pages/admin/addLegislative/AddLegislatif'
import { VoteLay } from "../layout/VoteLay";

export const router = createBrowserRouter([
    {
        children : [
            {
                path : "/login",
                element : <Login />
            },
            {
                path : "/login/admin",
                element : <LoginAdmin />
            },
            {
                element : <VoteLay />,
                children: [
                    {
                        path: '/votingbem',
                        element: <VotingBem />,
                        loader: loaderVotingBem
                    }
                ]
            },
            {
                element : <SideBarAdmin />,
                children : [
                    {
                        path : '/admin/legislative/:type',
                        element : <AddLegislative />,
                        loader: loaderAddLegislativeType,
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