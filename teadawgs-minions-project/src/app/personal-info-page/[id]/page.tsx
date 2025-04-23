'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import personalinfo from "../../../assets/personal_info_pic.jpg"
import { getSession } from "next-auth/react";
import Card from "@/components/Card";

const session = await getSession();

export default function PersonalInfoPage() {
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const id = session?.user?.id;

    const [editing, setEditing] = useState({
        username: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false
    });

    useEffect(() => {
        const getUserDetails = async () => {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUser(data);
        }
        getUserDetails();
    }, []);

    const handleEdit = (field: keyof typeof editing) => {
        setEditing(prev => ({
            ...prev,
            [field]: true,
          }));
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        console.log(id);
        setUser(prev => ({
          ...prev,
          [id]: value,
        }));
      };

    const handleSave = async (e: React.FormEvent) => {
        if (!user.username || !user.email || !user.password) {
            alert("Username, email, and password are required fields!");
            return;
        }
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            });
      
            if (!response.ok) {
              throw new Error('Network response failed');
            }
            setEditing({
                username: false,
                firstName: false,
                lastName: false,
                email: false,
                password: false
            });
            alert("Profile updated successfully");
          } catch (error) {
            console.error("Updated error:", error);
            alert(error instanceof Error ? error.message : "Failed to update profile");
          }
        };

        

    return(
        <div className="min-h-screen">
            <div className="flex flex-1">
                <div className="w-[40%] bg-red-400 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                <div className="relative z-10 ml-5">
                        <Image priority src={personalinfo} alt="paperdoingpaperwork" width={450} height={450} className="object-contain max-w-full max-h-full"></Image>
                    </div>
                </div>
                <div className="w-3/5">
    
                    <Card className="max-w-md mx-auto mt-[100px] p-4 bg-white">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Hello, </h1>
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
                                        <input type={field.type  || 'text'} id={field.id} value={user[field.id as keyof typeof user]} onChange={handleChange}
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
                    </Card>
                </div>
            </div>
        </div>
    )
 }