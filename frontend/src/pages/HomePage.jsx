import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Fetch notes from backend
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:7000/api/notes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                const sortedData = data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setNotes(sortedData);
            } catch (error) {
                console.error("Failed to fetch notes:", error.message);
            }
        };
        fetchData();
    }, []);

    // Filter notes based on search input
    useEffect(() => {
        if (!search) {
            setFilteredNotes(notes);
        } else {
            const lowerSearch = search.toLowerCase();
            const filtered = notes.filter((n) => {
                const title = (n.title || "").toLowerCase();
                const content = (n.content || "").toLowerCase();
                const tags = n.tags ? n.tags.toString().toLowerCase() : "";
                return (
                    title.includes(lowerSearch) ||
                    content.includes(lowerSearch) ||
                    tags.includes(lowerSearch)
                );
            });
            setFilteredNotes(filtered);
        }
    }, [notes, search]);

    return (
        <div className="min-h-screen bg-base-900">
            <Navbar search={search} setSearch={setSearch} />

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.length === 0 ? (
                    <div className="px-4 py-6 w-full">
                        <div className="mx-auto max-w-7xl bg-base-200 rounded-2xl shadow-md p-6">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                                Welcome to Notes App
                            </h1>
                            <p className="text-sm md:text-base text-gray-400">
                                Create, edit, and manage your notes easily with this simple, responsive interface.
                            </p>
                        </div>
                    </div>
                ) : filteredNotes.length === 0 ? (
                    <div className="px-4 py-6 w-full">
                        <div className="mx-auto max-w-7xl bg-base-200 rounded-2xl shadow-md p-6">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-4">
                                No notes found
                            </h1>
                            <p className="text-sm md:text-base text-gray-400">
                                Try searching with different keywords or add a new note.
                            </p>
                        </div>
                    </div>
                ) : (
                    filteredNotes.map((note) => (
                        <Card
                            key={note._id}
                            _id={note._id}
                            title={note.title}
                            content={note.content}
                            tags={note.tags}
                            createDate={note.createdAt}
                            updateDate={note.updatedAt}
                        />
                    ))
                )}
            </div>

            <button
                className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700"
                onClick={() => navigate("/add")}
            >
                <FaPlus className="text-white" />
            </button>
        </div>
    );
}
