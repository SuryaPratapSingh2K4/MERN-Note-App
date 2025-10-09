import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

export default function Card({ _id, title, content, tags, date }) {
    const navigate = useNavigate();
    console.log("Received date for note:", date);

    const handleEdit = () => {
        navigate(`/edit/${_id}`);
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (window.confirm("Are you sure you want to delete this note?")) {
            try {
                const res = await fetch(`http://localhost:7000/api/notes/${_id}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) {
                    alert("Note deleted successfully");
                    window.location.reload(); // refresh notes
                } else {
                    alert(data.message || "Failed to delete note");
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        
        <div className="p-4 bg-base-200 rounded shadow hover:shadow-lg">
            
            <div className="flex justify-between items-start mb-2">
                <h2 className="font-bold text-lg">{title}</h2>
                <div className="flex gap-2">
                    <FaEdit
                        className="cursor-pointer hover:text-blue-500"
                        onClick={handleEdit}
                    />
                    <FaTrash
                        className="cursor-pointer hover:text-red-500"
                        onClick={handleDelete}
                    />
                </div>
            </div>

            <p className="text-sm font-semibold italic text-gray-500 mb-2">
                {formatDate(new Date(date))}
            </p>
            <p className="mb-2">{content.slice(0, 100)}{content.length > 100 ? "..." : ""}</p>
            {tags && <p className="text-xs text-gray-400">Tags: {tags}</p>}
        </div>
    );
}
