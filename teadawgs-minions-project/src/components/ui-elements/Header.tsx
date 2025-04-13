"use client"
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header({authenticated}: {authenticated: boolean}) {
    const [loggedIn, setLoggedIn] = useState(authenticated);
    function handleLogout() {
        setLoggedIn(!loggedIn);
    }

    return (
        <div className="flex justify-center items-center bg-red-400 w-full h-20 space-x-2 shadow-lg">
            <div className="absolute left-4">
                <Image 
                    src="/teacup_dog_paw_logo.svg"
                    alt="Teacup Dog Paw Logo"
                    width={100}
                    height={100}
                    className="top-4 left-4 ml-4"
                    priority
                />
            </div>

            <h1 className={`font-lilita text-5xl`}>tea dawgs</h1>

            {loggedIn && (
            <div className="absolute right-4 flex items-center space-x-4">
                <Image
                    src="/profile_icon.svg"
                    alt="Profile Icon"
                    width={70}
                    height={70}
                    className="top-4 right-4 cursor-pointer"
                    priority
                />
                <button onClick={handleLogout} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 mr-4 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    <span className={`font-roboto} text-2xl`}>{"Logout"}</span>
                </button>
                </div>
            )}

            {!loggedIn && (
                <div className="absolute right-4 flex items-center space-x-4">
                    <span className={`font-roboto text-2xl`}>{"Create Account"}</span>
                    <button onClick={handleLogout} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 mr-4 cursor-pointer">
                        <span className={`font-roboto text-2xl`}>{"Login"}</span>
                    </button>
                </div>
            )}           
            
            
        </div>
    );
}