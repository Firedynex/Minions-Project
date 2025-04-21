"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doLogout } from "@/app/auth/authActions";
import { Session } from "next-auth";

interface HeaderProperties {
    session: Session | null;
}

// {authenticated}: {authenticated: boolean}
export default function Header({ session }: HeaderProperties) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
    }, [session]);

    const handleLogout = () => {
        doLogout();
        setIsLoggedIn(!!session?.user);
    }


    return (
        <nav className="bg-red-400 x-auto max-w-7x1 px-2 sm:px-6 l:px-8 mx-auto">
            <div className="relative grid p-3 items-center justify-between">
                {/* <div className="flex flex-1 items-center justify-center md:items-stretch"> */}
                    {/* Logo and name */}
                    <div className="md:flex left-4">
                        <Link href="/">
                            <Image 
                                src="/teacup_dog_paw_logo.svg"
                                alt="Teacup Dog Paw Logo"
                                width={50}
                                height={50}
                                className="md:h-16 md:w-16"
                                priority
                            />
                        </Link>
                    </div>
                    <h1 className={`font-lilita text-4xl md:text-5xl md:absolute md:left-1/2 md:transform md:-translate-x-1/2`}>tea dawgs</h1>
                {/* </div> */}

                {/* Login and out for Desktop*/}
                {isLoggedIn && session?.user ? (
                    <div className="md:absolute right-4 items-center space-x-4 flex">
                        <span className={`font-roboto text-xl `}>Welcome, {session.user?.name || session.user?.email}</span>
                        <button onClick={ handleLogout} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 mr-4 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                            <span className={`font-roboto} text-2xl`}>{"Logout"}</span>
                        </button>
                    </div>
                ) : (
                    <div className="md:absolute right-4 items-center space-x-4 flex">
                        <span className={`font-roboto text-xl hover:text-gray-700 hover: cursor-pointer`} onClick={() => router.push("/create-account-page")}>{"Create Account"}</span>
                        <button onClick={() => router.push("/login-page")} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 mr-4 cursor-pointer">
                            <span className={`font-roboto text-xl`}>{"Login"}</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}