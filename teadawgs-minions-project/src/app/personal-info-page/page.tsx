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
                                            <button type="button" onClick={() => handleEdit(field.id as keyof typeof editing)} className="ml-2 text-gray-500 hover:text-gray-700"></button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
 }