'use client';
import React, {useState} from "react";
import Header from "../../components/ui-elements/Header";
import Image from "next/image";
import personalinfo from "../../assets/personal_info_pic.jpg"

export default function PersonalInfoPage() {
    const [user, setUser] = useState({
        username: "Peter_Ben",
        firstName: "John",
        lastName: "Doe",
        email: "peterbui123@gmail.com",
        password: "password"
    });

    const [editing, setEditing] = useState({
        username: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    const handleEdit = (field: keyof typeof editing) => {
        setEditing({...editing, [field]: true});
    };

    const handleSave = () => {
        setEditing({
            username: false,
            firstName: false,
            lastName: false,
            email: false,
            password: false
        });
    };

    return(
        <div className="min-h-screen bg-white">
            <div className="absolute inset-0 overflow-hidden z-0">
                <div className="absolute top-[4%] left-[25%] h-80 w-80 rounded-full bg-red-400"></div>
                <div className="absolute top-[43%] left-[25%] h-62 w-62 rounded-full bg-red-400"></div>
                <div className="absolute top-[70%] left-[23%] h-70 w-70 rounded-full bg-red-400"></div>
            </div>
            <div className="relative z-10">
                <Header authenticated={true}/>
            </div>
            <div className="flex flex-1">
                <div className="w-[40%] bg-red-400 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="relative z-10 ml-5">
                        <Image src={personalinfo} alt="paperdoingpaperwork" width={450} height={450} className="object-contain max-w-full max-h-full"></Image>
                    </div>
                </div>
                <div className="w-3/5 bg-white">
    
                    <main className="max-w-md mx-auto mt-[100px] p-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Hello, {user.username}</h1>
                        <form className="space-y-6">
                            {[
                                {id: 'firstName', label: 'first Name'},
                                {id: 'lastName', label: 'last Name'},
                                {id: 'username', label: 'Username'},
                                {id: 'email', label: 'Email'},
                                {id: 'password', label: 'Password', type: 'password'}
                            ].map((field) => (
                                <div key={field.id} className="relative">
                                    <label htmlFor={field.id} className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">
                                        {field.label}
                                    </label>
                                    <div className="flex items-center">
                                        <input type={field.type  || 'text'} id={field.id} value={user[field.id as keyof typeof user]} onChange={(e) => setUser({...user, [field.id]: e.target.value})}
                                                readOnly={!editing[field.id as keyof typeof editing]} className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${!editing[field.id as keyof typeof editing] ? 'bg-gray-700 cursor-not-allowed' : 'bg-white text-gray-900 font-medium'}`}/>
                                        {!editing[field.id as keyof typeof editing] && (
                                            <button type="button" onClick={() => handleEdit(field.id as keyof typeof editing)} className="ml-2 text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <button type="button" onClick={handleSave} className="w-full bg-[#f87171] text-white py-2 px-4 rounded-md hover:bg-[#d13d3d] transition-colors">Save Changes</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
 }