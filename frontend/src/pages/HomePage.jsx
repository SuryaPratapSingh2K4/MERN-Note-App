import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:7000/api/notes", {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json();
            const sorteddata = await data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            setNotes(sorteddata)
        }
        fetchdata();
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.length === 0 ? (
                    <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6">
                        <div className="mx-auto max-w-7xl bg-base-200 rounded-2xl shadow-md p-6 md:p-8 lg:p-10">
                            {/* Your main content will go here */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white-800 mb-4">
                                Welcome to Notes App
                            </h1>
                            <p className="text-sm md:text-base text-white-600">
                                Create, edit, and manage your notes easily with this simple, responsive interface.
                            </p>
                        </div>
                    </div>
                ) : (
                    notes.map((note) => (
                        <Card
                            key={note._id}
                            _id={note._id}
                            title={note.title}
                            content={note.content}
                            tags={note.tags}
                            date={note.createdAt}
                        />
                    ))
                )}
            </div>
            <button
                className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700"
                onClick={() => navigate("/add")}
            >
                <FaPlus />
            </button>
        </div>
    );
}
