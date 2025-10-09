import React, { useState } from 'react'
import { FaDumpster, FaEdit, FaTrash } from 'react-icons/fa'

function Card({ title, content, tags, date }) {
    const [edit, setEdit] = useState(false);
    const onEdit = () => {

    }
    const onDelete = () => {

    }
    return (
        <div className="flex flex-col p-8 bg-base-200 rounded shadow hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
                <h1 className="font-bold text-lg">{title}</h1>
                <div className="flex gap-2">
                    <FaEdit className="hover:text-gray-400 cursor-pointer" onClick={onEdit} />
                    <FaTrash className="hover:text-gray-400 cursor-pointer" onClick={onDelete} />
                </div>
            </div>

            <span className="italic text-sm mb-2">{date}</span>

            <p className="mb-2">{content}</p>

            <h4 className="italic text-sm">{tags}</h4>
        </div>

    )
}

export default Card
