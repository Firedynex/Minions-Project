"use client"
import React, { useState } from "react";
import Image from "next/image";
import workout from "../../assets/workout.jpg"
import Card from "@/components/Card";

type User = {
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string
}

export default function CreateAccountPage() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please enter all required fields!");
            return;
        }

        const userData : User = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }

        const url = "http://localhost:3000/api/users/"
        try {
            const response = await fetch (url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error creating user: ${errorMessage}`);
            }
            setFirstName("");
            setLastName("");
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="min-h-screen">
            <div className="absolute inset-0 overflow-hidden z-[-1]">
                <div className="absolute top-[4%] left-[25%] h-80 w-80 rounded-full bg-red-400"></div>
                <div className="absolute top-[43%] left-[25%] h-62 w-62 rounded-full bg-red-400"></div>
                <div className="absolute top-[70%] left-[23%] h-70 w-70 rounded-full bg-red-400"></div>
            </div>
            <div className="flex flex-1">
                <div className="w-[40%] bg-red-400 min-h-[calc(100vh-4rem)] z-[-1]"
                >
                    <div className="relative ml-5">
                        <Image src={workout} alt="image_cluster" width={450} height={450} className="object-contain max-w-full max-h-full"></Image>
                    </div>
                    
                </div>
                <div className="w-3/5 z-10">
                    <Card className="max-w-md mx-auto mt-[100px] p-4 bg-white">
                        <h1 className="relative text-3xl font-bold text-gray-800 mb-8">Create Account</h1>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <label htmlFor="firstName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">First Name</label>
                                <input type="text" id="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-gray-800" placeholder="First Name" value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}/>
                            </div>
                            <div className="relative">
                                <label htmlFor="lastName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Last Name</label>
                                <input type="text" id="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-gray-700" placeholder="Last Name" value={lastName} onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}/>
                            </div>
                            <div className="relative">
                                <label htmlFor="username" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Username</label>
                                <input type="text" id="username" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-gray-700" placeholder="Username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}required/>
                            </div>
                            <div className="relative">
                                <label htmlFor="email" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Email</label>
                                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-gray-700" placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}required/>
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Password</label>
                                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171] text-gray-700" placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}required/>
                            </div>
                            <div className="relative">
                                <button type="submit" className="w-full bg-[#f87171] text-white py-2 px-4 rounded-md hover:bg-[#d13d3d] hover:cursor-pointer transition-color">Submit</button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}