import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function HomePage() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Fetch notes
    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await fetch("http://localhost:7000/api/notes", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();

                // Sort pinned first, then by createdAt
                const sorted = data.sort((a, b) => {
                    if (a.pinned === b.pinned) return new Date(b.createdAt) - new Date(a.createdAt);
                    return b.pinned - a.pinned; // pinned first
                });

                setNotes(sorted);
            } catch (err) {
                console.error("Failed to fetch notes:", err.message);
                toast.error("Failed to fetch notes");
            }
        };

        fetchData();
    }, []);

    // Search filter
    useEffect(() => {
        if (!search) return setFilteredNotes(notes);

        const lowerSearch = search.toLowerCase();
        const filtered = notes.filter((note) => {
            const title = note.title?.toLowerCase() || "";
            const content = note.content?.toLowerCase() || "";
            const tags = note.tags?.join(" ").toLowerCase() || "";
            return title.includes(lowerSearch) || content.includes(lowerSearch) || tags.includes(lowerSearch);
        });

        setFilteredNotes(filtered);
    }, [search, notes]);

    // Toggle pin
    const togglePin = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:7000/api/notes/${id}`, {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to toggle pin");
            const updatedNote = await res.json();

            setNotes((prev) =>
                prev
                    .map((note) => (note._id === id ? { ...note, pinned: updatedNote.pinned } : note))
                    .sort((a, b) => {
                        if (a.pinned === b.pinned) return new Date(b.createdAt) - new Date(a.createdAt);
                        return b.pinned - a.pinned;
                    })
            );
        } catch (err) {
            console.error(err);
            toast.error("Failed to toggle pin");
        }
    };

    // Delete note
    const deleteNote = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:7000/api/notes/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (res.ok) {
                toast.success("Note deleted successfully 🗑️");
                setNotes((prev) => prev.filter((note) => note._id !== id));
            } else {
                toast.error(data.message || "Failed to delete note");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete note");
        }
    };

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
                            pinned={note.pinned}
                            onTogglePin={togglePin}
                            onDelete={deleteNote}
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
