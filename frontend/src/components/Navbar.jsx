import React, { useEffect, useState } from "react";
import { getInitials } from "../utils/getInitials";
import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch }) {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            setUserInfo(JSON.parse(storedData));
        }
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUserInfo(null);
        navigate("/login");
    };

    return (
        <nav className="bg-base-300 px-4 py-3 shadow-md w-full">
            <div className="flex items-center justify-between gap-4 flex-nowrap">
                {/* Logo / Title */}
                <h1 className="text-xl px-3 font-bold text-white flex-shrink-0">
                    Notes
                </h1>

                {/* Search */}
                <input
                    type="search"
                    placeholder="Search"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered flex-grow min-w-[120px] max-w-[300px]"
                />

                {/* Profile */}
                <div className="flex items-center gap-2 flex-shrink-0">
                    {userInfo ? (
                        <>
                            <div className="w-10 h-10 flex items-center justify-center text-black rounded-full bg-gray-100 font-medium">
                                {getInitials(userInfo.fullname)}
                            </div>
                            <div className="text-white text-left">
                                <p className="text-sm">{userInfo.fullname}</p>
                                <p className="text-xs text-gray-300">{userInfo.email}</p>
                            </div>
                        </>
                    ) : (
                        <div className="text-white">Loading...</div>
                    )}

                    <button
                        onClick={handleLogOut}
                        className="ml-2 btn btn-sm btn-error whitespace-nowrap"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
