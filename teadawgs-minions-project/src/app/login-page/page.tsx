"use client"
import React, {useState} from "react";
import Image from "next/image";
import background from "../../assets/LoginBG.jpg"
import Card from "@/components/Card";
import { doCredentialLogin } from "../auth/authActions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    async function handleLogin(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            
            const response = await doCredentialLogin(formData);

            if (response?.error) {
                console.error(response.error);
                setError(response.error.message || "An error ocurred");
            } else {
                router.push("/authenticated-view");
            }
        } catch (error) {
            console.error(error);
            setError("Incorrect Credentials!");
        }
    }

    return (
        <div>
            <Image
                src={background}
                alt={"Stock Photos Background"}
                fill
                priority={true}
                className = "object-cover w-full h-full z-[-1]"
            />

            {/* Bubbles */}
            <div className = "absolute left-[50%] -translate-y-1/2 h-90 w-90 rounded-full bg-red-400 z-[-1]"></div>
            <div className = "absolute top-[25%] left-[40%] h-90 w-90 rounded-full bg-red-400 z-[-1]"></div>
            <div className = "absolute top-[65%] left-[40%] h-70 w-70 rounded-full bg-red-400 z-[-1]"></div>

            {/* Login form */}
            <div className="flex flex-1 ">
                <div className="w-[55%] bg-red-400 min-h-[calc(100vh-4rem)]">
                    <Card className="max-w-md mx-auto mt-[100px] p-4 bg-[#1C1A1A] mb-2">
                        <h1 className="relative text-3xl font-roboto text-white text-center">Welcome!</h1>
                        <h1 className="relative text-3xl font-roboto text-white text-center mb-5">Sign into your account</h1>

                        {error && (
                            <div className="text-red-400 text-sm mb-3">
                                {error}
                            </div>
                        )}

                        <form className="space-y-8" onSubmit={handleLogin}>
                            <div className="relative">
                                <label htmlFor="email" className="absolute -top-2 left-3 px-1 text-xs font-medium text-white bg-[#1C1A1A]">Email</label>
                                <input name="email" type="email" id="email" placeholder="Email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-white"/>  
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="absolute -top-2 left-3 px-1 text-xs font-medium text-white bg-[#1C1A1A]">Password</label>
                                <input name="password" type="password" id="password" placeholder="Password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-white"/>  
                            </div>
                            <div className="relative">
                                <button type="submit" className="w-full bg-white text-bold text-black py-2 px-4 rounded-md hover:bg-gray-300 hover:cursor-pointer transition-color">Login</button>
                            </div>
                        </form>
                    </Card>

                    {/* Create Account */}
                    <h1 className="relative text-xl font-lilita text-[#1C1A1A] text-center">Don't have an account yet?</h1> 
                    <button onClick={() => router.push("/create-account-page")} className="flex items-center justify-self-center rounded-xl bg-[#1C1A1A] p-2 hover:bg-gray-700 transition duration-300 mr-4 cursor-pointer">
                        <span className={`font-roboto text-sm`}>{"Create account"}</span>
                    </button>
                </div>
            </div>

        </div>
    )
}