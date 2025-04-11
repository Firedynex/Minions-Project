"use client"
import Image from "next/image";
import { Lilita_One, Roboto } from "next/font/google";
import { useState } from "react";

const lilita_One = Lilita_One({
    subsets: ["latin"],
    weight: "400",
});

const roboto = Roboto({
    subsets: ["latin"],
    weight: "400"
})

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(true);

    return (
        <div className="flex justify-between items-center bg-red-400 w-full rounded-2xl h-20 space-x-2">
            <Image 
                src="/teacup_dog_paw_logo.svg"
                alt="Teacup Dog Paw Logo"
                width={100}
                height={100}
                className="top-4 left-4 ml-4"
                priority
            />
            <h1 className={`${lilita_One.className} text-5xl`}>tea dawgs</h1>
            <Image
                src="/profile_icon.svg"
                alt="Profile Icon"
                width={50}
                height={50}
                className="top-4 right-4 mr-0 cursor-pointer"
                priority
            />
            <button onClick={() => setLoggedIn(!loggedIn)} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 mr-4 ml-0 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                <span className={`${roboto.className} text-2xl`}>Logout</span>
            </button>
        </div>
    );
}