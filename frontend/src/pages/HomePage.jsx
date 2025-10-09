import React from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import { FaAddressBook, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-8 py-2">
                <div className="mx-auto max-w-7xl rounded-2xl p-6  ">
                    {/* Your main content will go here */}
                    {/* <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white-800 mb-4">
                        Welcome to Notes App
                    </h1>
                    <p className="text-sm md:text-base text-white-600">
                        Create, edit, and manage your notes easily with this simple, responsive interface.
                    </p> */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <Card title="meeting  on 10th oct" content="kdbaw kajbiua wiawb abiuaw bawb" tags="bfiuawbfa" date="7th Oct 2025"/>
                        <Card title="meeting  on 10th oct" content="kdbaw kajbiua wiawb abiuaw bawb" tags="bfiuawbfa" date="7th Oct 2025"/>
                        <Card title="meeting  on 10th oct" content="kdbaw kajbiua wiawb abiuaw bawb" tags="bfiuawbfa" date="7th Oct 2025"/>
                    </div>


                </div>
            </div>
            <button className='w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600 hover:bg-blue-700 absolute right-10 bottom-10'>
                <FaPlus onClick={() => navigate('/add')}/>
            </button>
        </div>
    )
}

export default HomePage
