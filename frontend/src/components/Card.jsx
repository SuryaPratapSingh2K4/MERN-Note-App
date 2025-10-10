import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { truncateString } from "../utils/truncateString";
import Modal from "./Modal";
import toast from "react-hot-toast";

export default function Card({ _id, title, content, tags, createDate, updateDate }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleEdit = (e) => {
        e.stopPropagation(); // prevent modal
        navigate(`/edit/${_id}`);
    };

    const handleDelete = async (e) => {
        e.stopPropagation(); // prevent modal

        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`http://localhost:7000/api/notes/${_id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            if (res.ok) {
                
                toast.success("Note deleted successfully 🗑️");
                setTimeout(() => {
                    window.location.reload()
                }, 500);
                 // call parent to reload notes
            } else {
                toast.error(data.message || "Failed to delete note");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete note");
        }
    };

    return (
        <div
            className="p-4 bg-base-200 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => setShowModal(true)}
        >
            {showModal && (
                <Modal
                    id={_id}
                    title={title}
                    content={content}
                    tags={tags}
                    date={createDate}
                    onClose={() => setShowModal(false)}
                />
            )}

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

            <p className="text-sm text-white-700 mb-2 line-clamp-3 break-words">
                {truncateString(content)}
            </p>

            {tags && <p className="text-xs text-gray-400 mb-2">Tags: {tags}</p>}

            <p className="text-sm font-semibold italic text-gray-500">
                Created At: {formatDate(new Date(createDate))}
            </p>
            <p className="text-sm font-semibold italic text-gray-500 mb-2">
                Updated At: {formatDate(new Date(updateDate))}
            </p>
        </div>
    );
}
