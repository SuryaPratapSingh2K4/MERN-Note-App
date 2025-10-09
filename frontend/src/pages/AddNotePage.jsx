import React, { useState } from 'react'

import { getInitials } from '../utils/getInitials';
import { Link } from 'react-router-dom';

function AddNotePage() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState("")

    const handleLogOut = () => {
        // Add logout logic here
    };

    const handlAddNotes = () => {
    }
    return (
        <div className='min-h-screen'>
            <nav className="bg-base-300 px-4 py-3 shadow-md">
                <div className="flex items-center justify-between w-full flex-wrap gap-3">

                    {/* Left: Logo */}
                    <h2 className="text-xl font-semibold text-white whitespace-nowrap">
                        Notes
                    </h2>
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

            <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-2'>
                <div className='flex flex-col items-center justify-center mt-16'>
                    <div className='flex flex-col px-7 py-10 rounded w-120 border'>
                        <form onSubmit={handlAddNotes} className='flex flex-col gap-4'>
                            <h4 className='text-2xl mb-4 font-bold'>Create Notes</h4>
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>

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
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </label>

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
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                />
                            </label>



                            <div className='flex flex-row gap-4 items-center justify-center mt-2'>
                                <button type='submit' className="btn btn-neutral btn-outline text-white bg-green-600 hover:bg-green-700">Add Note</button>
                            <button type='submit' className="btn btn-neutral btn-outline text-white bg-red-600 hover:bg-red-700">Cancel Note</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddNotePage
