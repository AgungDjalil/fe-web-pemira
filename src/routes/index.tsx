import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/voter/auth/Login";
import { VotingBem, loaderVotingBem } from "../pages/voter/votePage/VotingBem";
import { LoginAdmin } from "../pages/admin/auth/LoginAdmin";
import { SideBarAdmin } from "../layout/SideBarAdmin";
import { AddLegislative } from "../pages/admin/addLegislative/AddLegislatif";
import { CreateLegislative } from "../pages/admin/addLegislative/CreateLegislative";
import { NotFoundPage } from "../pages/voter/NotFoundPage";
import { loaderAddLegislativeType } from '../pages/admin/addLegislative/AddLegislatif'
import { VoteLay } from "../layout/VoteLay";
import { VotingDpm, loaderVotingDpm } from "../pages/voter/votePage/VotingDpm";
import { ThanksPage } from "../pages/voter/ThanksPage";
import { LoadingComp } from "../components/LoadingComp";

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
                path: '/thanksPage',
                element: <ThanksPage />
            },
            {
                element : <VoteLay />,
                children: [
                    {
                        path: '/votingBem',
                        element: <VotingBem />,
                        loader: loaderVotingBem
                    },
                    {
                        path: '/votingDpm',
                        element: <VotingDpm />,
                        loader: loaderVotingDpm
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