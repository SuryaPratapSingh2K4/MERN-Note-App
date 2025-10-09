import React, { useState } from "react";
import { getInitials } from "../utils/getInitials";

function Navbar() {
    const [search, setSearch] = useState("");

    const handleLogOut = () => {
        // Add logout logic here
    };

    return (
        <nav className="bg-base-300 px-4 py-3 shadow-md">
            <div className="flex items-center justify-between w-full flex-wrap gap-3">

                {/* Left: Logo */}
                <h2 className="text-xl font-semibold text-white whitespace-nowrap">
                    Notes
                </h2>

                {/* Middle: Search Bar */}
                {/* <div className="flex-grow flex justify-center">
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-bordered w-full sm:w-60 md:w-80 bg-base-100 text-white placeholder-gray-400 focus:outline-none"
                    />
                </div> */}
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} required placeholder="Search" />
                </label>

                {/* Right: Profile Info */}
                <div className="flex items-center gap-3 justify-end flex-shrink-0">
                    {/* Profile dropdown */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <div className="w-10 h-10 flex items-center justify-center text-black rounded-full bg-gray-100 font-medium">
                                {getInitials("John Wick")}
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li onClick={handleLogOut}>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>

                    {/* User info */}
                    <div className="text-right text-white">
                        <p className="text-sm font-medium">John Wick</p>
                        <p className="text-xs text-gray-300">johnwick@gmail.com</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
