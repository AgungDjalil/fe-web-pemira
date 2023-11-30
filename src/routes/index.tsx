import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { VotingBem } from "../pages/VotingBem";

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
            }
        ],
        errorElement : <h1>halaman tidak ditemukan</h1>
    }
])