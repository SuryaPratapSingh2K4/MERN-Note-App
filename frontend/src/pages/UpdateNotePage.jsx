import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getInitials } from '../utils/getInitials';
import toast from 'react-hot-toast';

function UpdateNotePage() {

    const [loading, setLoading] = useState(false);
    const [note, setNote] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const data = localStorage.getItem("user");
        if (data) {
            setUserInfo(JSON.parse(data))
        }
    }, [])
    // const fetchNote = useCallback(async () => {
    //     try {
    //         setLoading(true);
    //         const token = await localStorage.getItem("token");
    //         const res = await fetch(`http://localhost:7000/api/notes/${id}`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         const data = await res.json();
    //         if (res.ok) {
    //             setNote(data)
    //         } else {
    //             console.log("failed to fetch the data");
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     } finally {
    //         setLoading(false)
    //     }
    // })
    useEffect(() => {
        const fetchNote = async () => {
            try {
                setLoading(true);
                const token = await localStorage.getItem("token");
                const res = await fetch(`/api/notes/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setNote(data)
                } else {
                    console.log("failed to fetch the data");
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchNote();
    }, [id])
    const handleUpdateNotes = async (e) => {
        e.preventDefault();
        try {
            const token = await localStorage.getItem("token");
            const res = await fetch(`/api/notes/${id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(note)
            })
            const data = await res.json();
            if (res.ok) {
                // alert("Note Updated Successfully")
                toast.success("Note updated successfully ✅");
                navigate("/dashboard")
            } else {
                console.log("failed to update the errors", data.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
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
                                        {getInitials(userInfo.fullname)}
                                    </div>
                                </div>
                                {/* <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li onClick={handleLogOut}>
                                        <a>Logout</a>
                                    </li>
                                </ul> */}
                            </div>

                            <div className="text-left text-white">
                                <p className="text-sm font-medium">{userInfo.fullname}</p>
                                <p className="text-xs text-gray-300">{userInfo.email}</p>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {loading ? "Loading..." : " "}

            {/* Form */}
            <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-2'>
                <div className='flex flex-col items-center justify-center mt-16'>
                    <div className='w-full max-w-2xl flex flex-col bg-base-300 px-10 py-12 rounded '>
                        <form onSubmit={handleUpdateNotes} className='flex flex-col gap-4'>
                            <h4 className='text-2xl mb-4 font-bold'>Update Note</h4>

                            <input
                                type="text"
                                required
                                placeholder="Title"
                                value={note?.title || ""}
                                onChange={(e) => setNote({ ...note, title: e.target.value })}
                                className="input w-full"
                            />

                            <textarea
                                placeholder="Content"
                                required
                                value={note?.content || ""}
                                onChange={(e) => setNote({ ...note, content: e.target.value })}
                                rows={7}
                                className="textarea textarea-md w-full"
                            ></textarea>

                            <input
                                type="text"
                                required
                                placeholder="Tags"
                                value={note?.tags || ""}
                                onChange={(e) => setNote({ ...note, tags: e.target.value })}
                                className="input w-full"
                            />

                            <div className='flex gap-4 justify-center mt-2'>
                                <button type='submit' className="bg-green-600 px-3 py-2 rounded hover:bg-green-700">Update Note</button>
                                <button
                                    type='button'
                                    onClick={() => navigate('/dashboard')}
                                    className="bg-red-600 px-3 py-2 rounded hover:bg-red-700"
                                >
                                    Cancel Note
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateNotePage
