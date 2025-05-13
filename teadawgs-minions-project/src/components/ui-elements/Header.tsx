"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { doLogout } from "@/app/auth/authActions";
import { Session } from "next-auth";

interface HeaderProperties {
    session: Session | null;
}

export default function Header({ session }: HeaderProperties) {
    const [isLoggedIn, setIsLoggedIn] = useState(!!session?.user);
    const router = useRouter();

    useEffect(() => {
        setIsLoggedIn(!!session?.user);
    }, [session]);

    const handleLogout = () => {
        doLogout();
        setIsLoggedIn(!!session?.user);
    };

    return (
        <nav className="bg-red-400 border-b-4 border-black px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3">
                {/* Logo and Name */}
                <div className="flex items-center space-x-4">
                    <Link href={isLoggedIn ? "/authenticated-view" : "/login-page"}>
                        <Image
                            src="/teacup_dog_paw_logo.svg"
                            alt="Teacup Dog Paw Logo"
                            width={50}
                            height={50}
                            className="h-12 w-12 sm:h-16 sm:w-16"
                            priority
                        />
                    </Link>
                    <h1 className="font-lilita text-3xl sm:text-4xl lg:text-5xl">tea dawgs</h1>
                </div>

                {/* Login/Logout Buttons */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn && session?.user ? (
                        <div className="flex items-center space-x-4">
                            <span className="font-roboto text-sm sm:text-lg">
                                Welcome, {session.user?.name || session.user?.email}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 border-2 border-black rounded-full bg-black px-4 py-2 hover:bg-gray-700 transition duration-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                    fill="#e3e3e3"
                                >
                                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                                </svg>
                                <span className="cursor-pointer font-roboto text-sm sm:text-lg text-white">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <span
                                className="font-roboto text-sm sm:text-lg hover:text-gray-700 cursor-pointer"
                                onClick={() => router.push("/create-account-page")}
                            >
                                Create Account
                            </span>
                            <button
                                onClick={() => router.push("/login-page")}
                                className="flex items-center space-x-2 border-2 border-black rounded-full bg-black px-4 py-2 hover:bg-gray-700 cursor-pointer transition duration-300"
                            >
                                <span className="font-roboto text-sm sm:text-lg text-white">Login</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}