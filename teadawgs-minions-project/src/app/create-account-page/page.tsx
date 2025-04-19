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
                    <main className="max-w-md mx-auto mt-8 p-4"></main>
            </div>
            </div>
            
            
        </div>
    );
}