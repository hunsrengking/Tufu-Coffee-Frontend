import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AlertMessage from '../../components/AlertMessage'

const Login = () => {
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [language, setLanguage] = useState('english')
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [alert, setAlert] = useState({ open: false, type: 'error', message: '' })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await login(credentials)
            if (result.success) {
                navigate('/dashboard')
            } else {
                setAlert({
                    open: true,
                    type: 'error',
                    message: result.message
                })
            }
        } catch (error) {
            setAlert({
                open: true,
                type: 'error',
                message: 'An unexpected error occurred. Please try again.'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setCredentials(prev => ({ ...prev, [id]: value }))
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] p-5 font-sans text-start">
            <AlertMessage
                isOpen={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />

            <div className="w-full max-w-[500px] bg-white shadow-2xl rounded-xl overflow-hidden min-h-[400px]">
                <div className="lg:absolute lg:top-5 lg:right-5 mb-5 lg:mb-0 text-right">
                    <label htmlFor="language" className="font-bold text-sm mr-2 text-neutral-700">Change language:</label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="border border-neutral-300 rounded-md px-2 py-1 text-sm text-neutral-600 bg-white cursor-pointer outline-none hover:border-[#003399] focus:border-[#003399] transition-colors"
                    >
                        <option value="english">English</option>
                        <option value="khmer">Khmer</option>
                    </select>
                </div>
                {/* Login Form */}
                <div className="w-full p-10 flex flex-col relative bg-white">

                    {/* Logo Section */}
                    <div className="flex justify-center mb-6">
                        <div className="w-[150px] h-[130px] flex items-center justify-center">
                            <img
                                src="/logo-tufu.png"
                                alt="TUFU Logo"
                                className="max-w-full max-h-full object-contain"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            <div className="hidden items-center justify-center bg-blue-50 rounded-2xl p-4">
                                <i className="fa-solid fa-mug-hot text-5xl text-[#132d65]"></i>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="relative mb-8">
                        <h2 className="text-2xl font-medium text-neutral-800 pb-1">Login</h2>
                        <div className="absolute bottom-0 left-0 h-[3px] w-6 bg-[#003399]"></div>
                    </div>

                    {/* Form */}
                    <form id="loginForm" onSubmit={handleSubmit} className="flex flex-col flex-grow">
                        <div className="relative flex items-center h-[50px] w-full my-3">
                            <i className="fas fa-user absolute left-3 text-[#132d65]"></i>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium placeholder:text-neutral-400"
                            />
                        </div>

                        <div className="relative flex items-center h-[50px] w-full my-3">
                            <i className="fas fa-lock absolute left-3 text-[#132d65]"></i>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium placeholder:text-neutral-400"
                            />
                        </div>

                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="relative flex items-center justify-center gap-2 bg-[#003399] text-white py-3 px-10 rounded-md font-semibold w-full max-w-[180px] transition-all hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg active:scale-95"
                            >
                                <span className={isLoading ? "opacity-0" : "opacity-100"}>Login</span>
                                {isLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
