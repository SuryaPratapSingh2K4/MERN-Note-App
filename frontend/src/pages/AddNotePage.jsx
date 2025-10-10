import React, { useState, useEffect } from 'react';
import { getInitials } from '../utils/getInitials';
import { useNavigate } from 'react-router-dom';

function AddNotePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUserInfo(JSON.parse(storedUser));
    }, []);

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleAddNotes = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:7000/api/notes/addNotes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ title, content, tags })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Note added successfully!");
                navigate("/dashboard"); // go back to homepage after adding
            } else {
                alert(data.message || "Failed to add note");
            }
        } catch (error) {
            console.error("Error adding note:", error.message);
        }
    };

    return (
        <div className='min-h-screen'>
            {/* Navbar */}
            <nav className="bg-base-300 px-4 py-3 shadow-md">
                <div className="flex items-center justify-between w-full flex-wrap gap-3">
                    <h2 className="text-xl font-semibold text-white whitespace-nowrap">Notes</h2>

                    {userInfo && (
                        <div className="flex items-center gap-3 justify-end flex-shrink-0">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button">
                                    <div className="w-10 h-10 flex items-center justify-center text-black rounded-full bg-gray-100 font-medium">
                                        {getInitials(userInfo.name)}
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

                            <div className="text-right text-white">
                                <p className="text-sm font-medium">{userInfo.name}</p>
                                <p className="text-xs text-gray-300">{userInfo.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Form */}
            <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-2'>
                <div className='flex flex-col items-center justify-center mt-8'>
                    <div className='w-full max-w-2xl flex flex-col bg-base-300 px-10 py-12 rounded '>
                        <form onSubmit={handleAddNotes} className='flex flex-col gap-4'>
                            <h4 className='text-2xl mb-4 font-bold'>Create Note</h4>

                            <input
                                type="text"
                                required
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="input w-full"
                            />

                            <textarea
                                placeholder="Content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="textarea textarea-md w-full"
                                rows={7}
                            ></textarea>

                            <input
                                type="text"
                                required
                                placeholder="Tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="input w-full"
                            />

                            <div className='flex gap-4 justify-center mt-2'>
                                <button type='submit' className="bg-green-600 px-3 py-2 rounded hover:bg-green-700">Add Note</button>
                                <button
                                    type='button'
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-red-600 px-3 py-2 rounded hover:bg-red-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddNotePage;
