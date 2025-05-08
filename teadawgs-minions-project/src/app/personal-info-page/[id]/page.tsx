'use client';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import personalinfo from "../../../assets/personal_info_pic.jpg"
import { getSession } from "next-auth/react";

const session = await getSession();
const id = session?.user?.id;

export default function PersonalInfoPage() {
    const [username, setUsername] = useState<string>(session?.user?.name || "");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [editFirstName, setEditFirstName] = useState<boolean>(false);
    const [editLastName, setEditLastName] = useState<boolean>(false);
    const [editUsername, setEditUsername] = useState<boolean>(false);
    const [editPassword, setEditPassword] = useState<boolean>(false);
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

    //Gets all the data for initial load of user
    useEffect(() => {
        const getUserDetails = async () => {
            const response = await fetch(`/api/users/${id}`);
            const data = await response.json();
            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setPassword(data.password);
        }
        getUserDetails();
    }, []);

    //Updates user in the database
    const handleSave = async (e: React.FormEvent) => {
        if (!username || !password) {
            alert("Username and password are required fields!");
            return;
        }
        e.preventDefault();
        const user: { username: string; firstName: string; lastName: string; password?: string } = {
            username: username,
            firstName: firstName,
            lastName: lastName,
        };

        if (passwordChanged) {
            user.password = password;
        }

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
            setEditFirstName(false);
            setEditLastName(false);
            setEditUsername(false);
            setEditPassword(false);
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
                    <main className="max-w-md mx-auto mt-[100px] p-4 bg-white">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">
                            Hello, {username}
                        </h1>
                        <form className="space-y-6">
                            <div className="relative flex">
                                <label htmlFor="firstName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">
                                    First Name
                                </label>
                                <input type="text" id="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} readOnly={!editFirstName}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${editFirstName? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 cursor-not-allowed'}`}/>
                                <button type="button" onClick={() => setEditFirstName(!editFirstName)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative flex">
                                <label htmlFor="lastName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">
                                    Last Name
                                </label>
                                <input type="text" id="lastName" value={lastName} onChange={(e) => {setLastName(e.target.value)}} readOnly={!editLastName}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${editLastName? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 cursor-not-allowed'}`}/>
                                <button type="button" onClick={() => setEditLastName(!editLastName)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative flex">
                                <label htmlFor="username" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">
                                    Username
                                </label>
                                <input type="text" id="username" value={username} onChange={(e) => {setUsername(e.target.value)}} readOnly={!editUsername}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${editUsername? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 cursor-not-allowed'}`}/>
                                <button type="button" onClick={() => setEditUsername(!editUsername)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            </div>
                            <div className="relative flex">
                                <label htmlFor="password" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">
                                    Password
                                </label>
                                <input type="password" id="password" value={password} onChange={(e) => {
                                    setPasswordChanged(true); 
                                    setPassword(e.target.value);
                                }} 
                                readOnly={!editPassword}
                                className={`w-full px-3 py-2 border border-gray-300 rounded-mb focus:outline-none focus:ring-2 focus ring-[#f87171] ${editPassword? 'bg-white text-gray-900 font-medium' : 'bg-gray-700 cursor-not-allowed'}`}/>
                                <button type="button" onClick={() => setEditPassword(!editPassword)} className="ml-2 text-gray-500 hover:text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>
                            </div>
                            <button type="button" onClick={handleSave} className="w-full bg-[#f87171] text-white py-2 px-4 rounded-md hover:bg-[#d13d3d] transition-colors">Save Changes</button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
 }