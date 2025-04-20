'use client';
import React, {useState} from "react";
import Header from "../../components/ui-elements/Header";

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
        firstname: false,
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
            <Header authenticated={true}/>
            <div className="flex flex-1">
                <div className="w-[40%] bg-red-400 min-h-[calc(100vh-4rem)]"></div>
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
                                                readOnly={!editing[field.id as keyof typeof editing]} className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${!editing[field.id as keyof typeof editing] ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}/>
                                        {!editing[field.id as keyof typeof editing] && (
                                            <button type="button" onClick={() => handleEdit(field.id as keyof typeof editing)} className="ml-2 text-gray-500 hover:text-gray-700">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
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