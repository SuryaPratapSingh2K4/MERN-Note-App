import React, { useEffect, useState } from "react";
import { getInitials } from "../utils/getInitials";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [search, setSearch] = useState("");
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
        setUserInfo(null); // immediately update state
        navigate("/login");
    };

    return (
        <nav className="bg-base-300 px-4 py-3 shadow-md flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Notes</h2>

            {userInfo && (
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <input
                        type="search"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered"
                    />

                    {/* Profile */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 flex items-center justify-center text-black rounded-full bg-gray-100 font-medium">
                            {getInitials(userInfo.fullname)}
                        </div>
                        <div className="text-white text-left">
                            <p>{userInfo.fullname}</p>
                            <p className="text-xs text-gray-300">{userInfo.email}</p>
                        </div>
                        <button onClick={handleLogOut} className="ml-2 btn btn-sm btn-error">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
