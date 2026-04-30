import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate('/dashboard')
        }, 1200)
    }

    return (
        <div className="min-h-screen w-full flex bg-neutral-50">
            {/* Left Side: Branding / Image Section */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600 via-brand-700 to-neutral-900 items-center justify-center relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-brand-500 opacity-10 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent"></div>

                <div className="relative z-10 text-center px-12 space-y-8 max-w-md">
                    <div className="mx-auto w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-300 group cursor-pointer">
                        <i className="fa-solid fa-mug-hot text-[48px] text-brand-600 group-hover:scale-110 transition-transform"></i>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight">
                            Tufu Coffee<br />
                            <span className="bg-gradient-to-r from-amber-300 to-amber-100 bg-clip-text text-transparent">Administration</span>
                        </h2>
                        <p className="text-brand-100 text-lg font-medium leading-relaxed opacity-90">
                            Streamlined coffee shop management built for modern businesses. Manage operations, analytics, and growth all in one place.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="pt-8 space-y-3">
                        <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-300"></div>
                            <span className="text-sm font-medium">Real-time analytics</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-300"></div>
                            <span className="text-sm font-medium">Inventory management</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-300"></div>
                            <span className="text-sm font-medium">Secure and reliable</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8 bg-neutral-50">
                <div className="w-full max-w-sm space-y-8">
                    {/* Header */}
                    <div className="space-y-3">
                        <div className="lg:hidden flex items-center gap-3 mb-8">
                            <div className="p-2.5 bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl">
                                <i className="fa-solid fa-mug-hot text-xl text-white"></i>
                            </div>
                            <span className="text-xl font-display font-bold tracking-tight text-neutral-900">TUFU COFFEE</span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-neutral-900 tracking-tight">Welcome Back</h1>
                        <p className="text-neutral-600 font-medium">Sign in to access your management dashboard.</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="space-y-2.5">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative group">
                                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400 group-focus-within:text-brand-600 transition-colors"></i>
                                <input
                                    type="email"
                                    required
                                    placeholder="admin@tufucoffee.com"
                                    className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors pl-10"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2.5">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative group">
                                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400 group-focus-within:text-brand-600 transition-colors"></i>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors pl-10 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? <i className="fa-solid fa-eye-slash text-lg"></i> : <i className="fa-solid fa-eye text-lg"></i>}
                                </button>
                            </div>
                        </div>

                        {/* Remember & Forgot */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 rounded-md border-neutral-300 text-brand-600 focus:ring-brand-600 cursor-pointer" 
                                />
                                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-10 bg-brand-600 hover:bg-brand-700 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <i className="fa-solid fa-arrow-right text-sm"></i>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-neutral-50 text-neutral-500 font-medium">Enterprise Auth</span>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <p className="text-center text-neutral-500 text-xs font-medium leading-relaxed">
                        🔒 Your credentials are encrypted and secured with industry-standard protocols.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login 