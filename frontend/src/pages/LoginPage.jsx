import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye } from 'react-icons/fa';

function LoginPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => setIsShowPassword(!isShowPassword);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:7000/api/users/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "Login failed");
                setLoading(false);
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/dashboard");
        } catch (error) {
            console.error("Something went wrong.", error.message);
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-base-300'>
            <div className='bg-base-200 px-7 py-10 rounded w-96 shadow-md'>
                <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                    <h4 className='text-2xl mb-4 font-bold'>Login</h4>

                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input w-full"
                    />

                    <div className="relative">
                        <input
                            type={isShowPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input w-full"
                        />
                        <FaRegEye
                            size={22}
                            className="absolute right-3 top-2 cursor-pointer text-blue-400"
                            onClick={togglePassword}
                        />
                    </div>

                    <button className="btn btn-neutral btn-outline bg-green-600 hover:bg-green-700 text-white">
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <h4 className='text-center'>
                        Not registered yet? <Link to='/signup' className='underline font-bold'>Create an Account</Link>
                    </h4>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
