"use client"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import SplashBG from '../assets/splashBG.jpg';
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const session = await getSession();

export default function NotFound() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
    useEffect(() => {
            setIsLoggedIn(!!session?.user);
        }, [session]);
    
    return (
        <div>
            <Image
                src={SplashBG}
                alt={"Stock Photos Background"}
                fill
                priority={true}
                className = "object-cover w-full h-full z-[-1]"
            />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                <h1 className="text-4xl font-lilita mb-4 rounded-2xl text-red-400">404 - Page Not Found</h1>
                <p className="text-lg mb-6 font-roboto text-gray-700">
                    The page you&apos;re looking for doesn&apos;t exist yet!
                </p>
                <Link href={isLoggedIn ? "/authenticated-view" : "/"} className="inline-block bg-black text-white px-6 py-2  font-roboto rounded-full hover:bg-gray-800 transition duration-300">
                    Go Back Home
                </Link>
      </div>
    </div>
        </div>
    );
}