import React, { useState } from "react";
import { FaEdit, FaTrash, FaThumbtack } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { truncateString } from "../utils/truncateString";
import Modal from "./Modal";

export default function Card({ _id, title, content, tags, createDate, updateDate, pinned, onDelete, onPinToggle }) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isPinned, setIsPinned] = useState(pinned);

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/edit/${_id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        if (onDelete) onDelete(_id);
    };

    const handleTogglePin = async (e) => {
        e.stopPropagation();
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`/api/notes/${_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error("Failed to toggle pin");

            const data = await res.json();
            setIsPinned(data.pinned); // update local state
            if (onPinToggle) onPinToggle(_id, data.pinned); // optional: update parent
        } catch (err) {
            console.error(err);
            alert("Failed to toggle pin");
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
                    <FaThumbtack
                        className={`cursor-pointer ${isPinned ? "text-yellow-400" : "text-gray-300 hover:text-yellow-400"}`}
                        onClick={handleTogglePin}
                    />
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

            {tags && <p className="text-xs text-gray-400 mb-2">Tags: {tags.join(", ")}</p>}

            <p className="text-sm font-semibold italic text-gray-500">
                Created At: {formatDate(new Date(createDate))}
            </p>
            <p className="text-sm font-semibold italic text-gray-500 mb-2">
                Updated At: {formatDate(new Date(updateDate))}
            </p>
        </div>
    );
}
