import React from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaRegEye } from 'react-icons/fa'

function SignUpPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [fullname, setfullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const togglePassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!fullname || !email || !password) {
            alert("Please fill all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ fullname, email, password })
            })
            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "SignUp Failed")
                return;
            }
            localStorage.setItem("user", JSON.stringify(data.user))
            if (data.token) {
                localStorage.setItem("token", data.token)
            }
            setLoading(false)
            navigate("/login")
            // setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false)
        }
    }
    return (
        <div>
                    <nav className="bg-base-300 px-4 py-3 shadow-md w-full">
                            <h1 className="text-xl px-3 font-bold text-white flex-shrink-0">
                                Notes
                            </h1>

                    </nav>
            <div className='flex flex-col items-center justify-center mt-16'>
                <div className='flex flex-col bg-base-300 px-7 py-10 rounded w-96'>
                    <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
                        <h4 className='text-2xl mb-4 font-bold'>SignUp</h4>


                        <label className="input validator w-full">
                            <svg
                                className="h-[1em] opacity-50"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="Name"
                                value={fullname}
                                onChange={(e) => setfullname(e.target.value)}
                            />
                        </label>


                        <label className="input validator w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="mail@site.com" required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>


                        <label className="input validator w-full">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                    ></path>
                                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type={isShowPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <FaRegEye
                                size={22}
                                className="text-blue-400 cursor-pointer"
                                onClick={togglePassword}
                            />
                        </label>
                        <p className="validator-hint hidden">
                            Must be more than 8 characters, including
                        </p>


                        <button type='submit' className="btn btn-neutral btn-outline text-white bg-green-600 hover:bg-green-700">{loading ? "Creating" : "Create Acoount"}</button>
                        <h4 className='text-center'>Already have an account. <Link to={'/login'} className='underline font-bold'>Login here</Link></h4>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage
