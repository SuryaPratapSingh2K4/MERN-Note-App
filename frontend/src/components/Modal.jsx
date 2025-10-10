import React from 'react'
import { FaCalendar, FaTimes } from 'react-icons/fa'
import { formatDate } from '../utils/formatDate'

function Modal({ id, title, content, tags, date, onClose }) {
    return (
        <div className='fixed bg-black bg-opacity-60 top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center'>
            <div
                onClick={(e) => e.stopPropagation()}
                className='w-full max-w-lg max-h-[80vh] bg-base-100 rounded-xl p-6 flex flex-col relative overflow-y-auto overflow-x-hidden'>
                <FaTimes className='absolute right-6 top-6 text-3xl text-customRed cursor-pointer'
                    onClick={onClose}
                />
                <h2 className='text-white font-bold'>Note ID: <span className='font-normal mt-2'> {id}</span></h2>
                <div className='flex justify-start items-center gap-x-2'>
                    <FaCalendar className='text-red-300 text-2xl' />
                    <h2 className='my-1'>{formatDate(new Date(date))}</h2>
                </div>
                <div className='mt-4 flex flex-col'>
                    <label className='text-white font-bold'>Title:</label>
                    {title}
                </div>
                <div className='mt-4 flex flex-col'>
                    <label className='text-white font-bold'>Content:</label>
                    <p className='text-gray-200 break-words whitespace-pre-wrap'>{content}</p>
                </div>
                <div className='mt-4 flex flex-col'>
                    <label className='text-white font-bold'>Tags:</label>
                    {tags}
                </div>
            </div>
        </div>
    )
}

export default Modal
