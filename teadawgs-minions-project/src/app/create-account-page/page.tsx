import React from "react";
import Header from "../../components/ui-elements/Header";

export default function CreateAccountPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header authenticated={false}/>
            <div className="flex flex-1">
                <div className="w-[40%] bg-red-400 min-h-[calc(100vh-4rem)]"
                ></div>
                <div className="w-3/5 bg-white">
                    <main className="max-w-md mx-auto mt-8 p-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h1>
                        <form className="space-y-6">
                            <div className="relative">
                                <label htmlFor="firstName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">First Name</label>
                                <input type="text" id="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171]" placeholder="First Name" />
                            </div>
                            <div className="relative">
                                <label htmlFor="lastName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Last Name</label>
                                <input type="text" id="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171]" />
                            </div>
                            <div className="relative">
                                <label htmlFor="email" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Email</label>
                                <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171]" />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Password</label>
                                <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f87171]" />
                            </div>
                        </form>
                    </main>
            </div>
            </div>
            
            
        </div>
    );
}