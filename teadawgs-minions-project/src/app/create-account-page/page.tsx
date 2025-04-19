import React from "react";
import Header from "../../components/ui-elements/Header";

export default function CreateAccountPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header authenticated={false}/>
            <div className="flex flex-1">
                <div className="w-[40%] min-h-[calc(100vh-4rem)]"
                    style={{backgroundColor: '#E54747'}}
                ></div>
                <div className="w-3/5 bg-white">
                    <main className="max-w-md mx-auto mt-8 p-4">
                        <h1 className="text-3xl font-bold text-gray-800 mb-8">Create Account</h1>
                        <form className="space-y-6">
                            <div className="relative">
                                <label htmlFor="firstName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">First Name</label>
                                <input type="text" id="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E54747]" placeholder="First Name" />
                            </div>
                            <div className="relative">
                                <label htmlFor="lastName" className="absolute -top-2 left-3 px-1 text-xs font-medium text-gray-700 bg-white">Last Name</label>
                                <input type="text" id="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E54747]" />
                            </div>
                            
                        </form>
                    </main>
            </div>
            </div>
            
            
        </div>
    );
}