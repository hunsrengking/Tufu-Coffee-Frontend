import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AlertMessage from '../../components/AlertMessage'

const STEPS = {
    LOGIN: 'login',
    FORGOT: 'forgot',
    VERIFY: 'verify',
    RESET: 'reset'
}

const Login = () => {
    const { login, forgotPassword, resetPassword, verifyOTP } = useAuth()
    const navigate = useNavigate()

    // UI State
    const [step, setStep] = useState(STEPS.LOGIN)
    const [isLoading, setIsLoading] = useState(false)
    const [alert, setAlert] = useState({ open: false, type: 'error', message: '' })
    const [timer, setTimer] = useState(60) // 1 minute in seconds

    // Form Data State
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [forgotEmail, setForgotEmail] = useState('')
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [resetData, setResetData] = useState({ newPassword: '', confirmPassword: '' })

    // Timer Effect
    useEffect(() => {
        let interval = null;
        if (step === STEPS.VERIFY && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // --- Handlers ---

    const handleLogin = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await login(credentials)
            if (result.success) {
                navigate('/dashboard')
            } else {
                setAlert({ open: true, type: 'error', message: result.message })
            }
        } catch (error) {
            setAlert({ open: true, type: 'error', message: 'Login failed. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgot = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const result = await forgotPassword(forgotEmail)
            if (result.success) {
                setStep(STEPS.VERIFY)
                setTimer(60) // Reset to 1 minute
                setAlert({ open: true, type: 'success', message: 'Recovery code sent to your email.' })
            } else {
                setAlert({ open: true, type: 'error', message: result.message })
            }
        } catch (error) {
            setAlert({ open: true, type: 'error', message: 'Failed to request recovery. Try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return
        const newOtp = [...otp]
        newOtp[index] = value.substring(value.length - 1)
        setOtp(newOtp)

        if (value && index < 5) {
            setTimeout(() => {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput?.focus()
            }, 10)
        }
    }

    const handleVerify = async (e) => {
        e.preventDefault()
        const code = otp.join('')
        if (code.length !== 6) {
            setAlert({ open: true, type: 'error', message: 'Please enter the full 6-digit code.' })
            return
        }
        setIsLoading(true)
        try {
            const result = await verifyOTP({ email: forgotEmail, otp: code })
            if (result.success) {
                setStep(STEPS.RESET)
            } else {
                setAlert({ open: true, type: 'error', message: result.message })
            }
        } catch (error) {
            setAlert({ open: true, type: 'error', message: 'Verification failed. Try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = async (e) => {
        e.preventDefault()
        if (resetData.newPassword !== resetData.confirmPassword) {
            setAlert({ open: true, type: 'error', message: 'Passwords do not match.' })
            return
        }

        setIsLoading(true)
        try {
            const result = await resetPassword({
                email: forgotEmail,
                newPassword: resetData.newPassword
            })

            if (result.success) {
                setAlert({ open: true, type: 'success', message: 'Password reset successfully. Please login.' })
                setStep(STEPS.LOGIN)
                setOtp(['', '', '', '', '', ''])
                setForgotEmail('')
                setResetData({ newPassword: '', confirmPassword: '' })
            } else {
                setAlert({ open: true, type: 'error', message: result.message })
            }
        } catch (error) {
            setAlert({ open: true, type: 'error', message: 'Failed to reset password. Try again.' })
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#f8f9fa] p-5 font-sans">
            <AlertMessage
                isOpen={alert.open}
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert({ ...alert, open: false })}
            />

            <div className="w-full max-w-[480px] bg-white shadow-2xl rounded-3xl overflow-hidden animate-fade-in border border-slate-100">
                <div className="p-10 flex flex-col bg-white">
                    <div className="flex justify-center mb-8">
                        <div className="h-24 flex items-center justify-center">
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
                                <i className="fa-solid fa-mug-hot text-4xl text-[#132d65]"></i>
                            </div>
                        </div>
                    </div>

                    {step === STEPS.LOGIN && (
                        <form onSubmit={handleLogin} className="flex flex-col flex-grow animate-fade-in">
                            <div className="relative mb-8">
                                <h2 className="text-2xl font-bold text-neutral-800 pb-1">Login</h2>
                                <div className="absolute bottom-0 left-0 h-[3px] w-6 bg-[#003399]"></div>
                            </div>
                            <div className="relative flex items-center h-[50px] w-full my-3">
                                <i className="fas fa-user absolute left-3 text-[#132d65]"></i>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    required
                                    className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium"
                                />
                            </div>
                            <div className="relative flex items-center h-[50px] w-full my-3">
                                <i className="fas fa-lock absolute left-3 text-[#132d65]"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    required
                                    className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium"
                                />
                            </div>
                            <div className="flex justify-end mt-2">
                                <button type="button" onClick={() => setStep(STEPS.FORGOT)} className="text-sm font-bold text-[#003399] hover:underline">Forgot Password?</button>
                            </div>
                            <div className="flex justify-center mt-10">
                                <button type="submit" disabled={isLoading} className="relative flex items-center justify-center bg-[#003399] text-white py-3.5 px-10 rounded-xl font-bold w-full transition-all hover:bg-blue-800 disabled:opacity-70 shadow-lg shadow-blue-900/20 active:scale-[0.98]">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === STEPS.FORGOT && (
                        <form onSubmit={handleForgot} className="flex flex-col animate-fade-in">
                            <div className="relative mb-6">
                                <h2 className="text-2xl font-bold text-neutral-800 pb-1">Recovery</h2>
                                <div className="absolute bottom-0 left-0 h-[3px] w-6 bg-[#003399]"></div>
                            </div>
                            <p className="text-sm text-neutral-500 mb-6 font-medium">Enter your email address and we'll send you a 6-digit code to reset your password.</p>
                            <div className="relative flex items-center h-[50px] w-full mb-8">
                                <i className="fas fa-envelope absolute left-3 text-[#132d65]"></i>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    required
                                    className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <button type="submit" disabled={isLoading} className="relative flex items-center justify-center bg-[#003399] text-white py-3.5 px-10 rounded-xl font-bold w-full transition-all hover:bg-blue-800 disabled:opacity-70 shadow-lg active:scale-[0.98]">
                                    {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Send Reset Code'}
                                </button>
                                <button type="button" onClick={() => setStep(STEPS.LOGIN)} className="text-sm font-bold text-neutral-500 hover:text-neutral-800 py-2 transition-colors">Back to Login</button>
                            </div>
                        </form>
                    )}

                    {step === STEPS.VERIFY && (
                        <form onSubmit={handleVerify} className="flex flex-col animate-fade-in text-center">
                            <div className="mb-6">
                                <div className="w-16 h-16 bg-blue-50 text-[#003399] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fa-solid fa-clock-rotate-left text-2xl"></i>
                                </div>
                                <h2 className="text-2xl font-bold text-neutral-800">Verify OTP</h2>
                                <p className="text-sm text-neutral-500 mt-2 font-medium">
                                    Code expires in <span className={`font-bold ${timer < 60 ? 'text-rose-600' : 'text-[#003399]'}`}>{formatTime(timer)}</span>
                                </p>
                            </div>
                            <div className="flex justify-between gap-2 mb-10">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Backspace' && !digit && index > 0) {
                                                document.getElementById(`otp-${index - 1}`)?.focus()
                                            }
                                        }}
                                        className="w-full h-14 text-center text-xl font-bold border-2 border-neutral-100 rounded-xl focus:border-[#003399] focus:bg-blue-50 transition-all outline-none"
                                    />
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="bg-[#003399] text-white py-3.5 px-10 rounded-xl font-bold w-full shadow-lg active:scale-[0.98] transition-all"
                            >
                                Verify & Continue
                            </button>
                            <button
                                type="button"
                                onClick={handleForgot}
                                className="text-sm font-bold text-neutral-500 hover:text-neutral-800 mt-6 transition-colors"
                            >
                                Didn't receive a code? <span className="text-[#003399]">Resend</span>
                            </button>
                        </form>
                    )}

                    {step === STEPS.RESET && (
                        <form onSubmit={handleReset} className="flex flex-col animate-fade-in">
                            <div className="relative mb-6">
                                <h2 className="text-2xl font-bold text-neutral-800 pb-1">New Password</h2>
                                <div className="absolute bottom-0 left-0 h-[3px] w-6 bg-[#003399]"></div>
                            </div>
                            <p className="text-sm text-neutral-500 mb-6 font-medium">Create a strong password to secure your account.</p>
                            <div className="relative flex items-center h-[50px] w-full my-3">
                                <i className="fas fa-lock absolute left-3 text-[#132d65]"></i>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={resetData.newPassword}
                                    onChange={(e) => setResetData({ ...resetData, newPassword: e.target.value })}
                                    required
                                    className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium"
                                />
                            </div>
                            <div className="relative flex items-center h-[50px] w-full mt-3 mb-10">
                                <i className="fas fa-check-circle absolute left-3 text-[#132d65]"></i>
                                <input
                                    type="password"
                                    placeholder="Confirm New Password"
                                    value={resetData.confirmPassword}
                                    onChange={(e) => setResetData({ ...resetData, confirmPassword: e.target.value })}
                                    required
                                    className="h-full w-full outline-none border-b-2 border-neutral-200 focus:border-[#003399] transition-all px-10 text-base font-medium"
                                />
                            </div>
                            <button type="submit" disabled={isLoading} className="relative flex items-center justify-center bg-[#003399] text-white py-3.5 px-10 rounded-xl font-bold w-full transition-all hover:bg-blue-800 disabled:opacity-70 shadow-lg active:scale-[0.98]">
                                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login
