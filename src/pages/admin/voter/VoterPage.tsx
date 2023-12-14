import { Await, defer, useLoaderData, useNavigate, useParams } from "react-router-dom";
import { LoadingComp } from "../../../components/LoadingComp";
import { TableComp } from "../../../components/TableComp";
import { useAuthContext } from "../../../context/AuthContext";
import { NotFoundPage } from "../../voter/NotFoundPage";
import { getAllVoters } from "../../../apis";
import { getAccessToken } from "../../../utils";
import React, { useEffect, useState } from "react";

export async function loaderVoterPage({ params }: any) {
    const accessToken = getAccessToken()
    const result = getAllVoters(params.pageNum, params.searchTerm, accessToken)
    return defer({
        dataVoters: result
    })
}

export function VoterPage() {
    const [pageNumber, setPageNum] = useState(Number)
    const { role, isReady } = useAuthContext()
    const data: any = useLoaderData()
    const navigate = useNavigate()
    const { pageNum } = useParams()
    const [searchTerm, setSearchTerm] = useState(String)

    useEffect(() => {
        if (pageNum) {
            const parsedPageNum = parseInt(pageNum);
            if (!isNaN(parsedPageNum)) {
                setPageNum(parsedPageNum);
            }
        }
    }, [pageNum, setPageNum]);

    if (!role && !isReady) return <LoadingComp />

    if (role !== 'admin' && isReady) return <NotFoundPage />

    const handleSubmit = (ev: any) => {
        ev.preventDefault();
        navigate(`/admin/voter/page/${pageNum}/search/${searchTerm}`)
    }

    const handleNextPage = () => {
        setPageNum((prevPageNum) => prevPageNum + 1);
        navigate(`/admin/voter/page/${pageNumber + 1}/search/null`);
    };
    
    const handlePrevPage = () => {
        setPageNum((prevPageNum) => Math.max(prevPageNum - 1, 1));
        navigate(`/admin/voter/page/${Math.max(pageNumber - 1, 1)}/search/null`);
    };    

    return (
        <main>
            <div className="p-4 sm:ml-64">
                <form className="mb-4" onSubmit={handleSubmit}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input onChange={ev => setSearchTerm(ev.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Voter..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                    </div>
                </form>

                <React.Suspense
                    fallback={<LoadingComp />}
                >
                    <Await
                        resolve={data.dataVoters}
                        errorElement={
                            <p>Error loading data!</p>
                        }
                    >
                        {(dataVoters) => (
                            <div>
                                {dataVoters.data.length > 0 && dataVoters.data.map(({ voterID, fullName, nim, joinAt }: { voterID: string, fullName: string, nim: string, joinAt: string }) => (
                                    <div key={voterID}>
                                        <TableComp voterID={voterID} fullName={fullName} joinAt={joinAt} nim={nim} />
                                    </div>
                                ))}
                                <div className="flex justify-between mt-4">
                                    <button onClick={handlePrevPage} disabled={pageNumber === 1} className="bg-gray-300 px-4 py-2 rounded-lg">Previous</button>
                                    <button onClick={handleNextPage} className="bg-blue-700 text-white px-4 py-2 rounded-lg">Next</button>
                                </div>
                            </div>
                        )}
                    </Await>
                </React.Suspense>
            </div>
        </main>
    )
}