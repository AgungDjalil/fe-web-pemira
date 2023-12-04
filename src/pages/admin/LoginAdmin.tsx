import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"

export function LoginAdmin() {
    const { login } = useAuthContext()
    const [nim, setNim] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    async function handleSubmit(e: any) {
        e.preventDefault()
        const result: any = await login(nim, password)

        if(result.isSuccess)
            navigate('/admin/home')

        if(!result.isSuccess)
            console.log(result.message)
    }

    return (
        <section className="bg-gray-50">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen bg-primary-color">
                <div className="w-full bg-white rounded-lg shadow max-w-md">
                    <div className="p-6 space-y-4">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-tight">
                            Admin Page
                        </h1>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="nim" className="block mb-2 text-sm font-medium">Your nim</label>
                                <input onChange={e => setNim(e.target.value)} type="nim" name="nim" id="nim" className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="xxxxxxxxxx" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required={true} />
                            </div>
                            <button type="submit" className="bg-black w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 text-white mt-10 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}