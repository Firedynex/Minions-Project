import { SessionProvider } from "next-auth/react"
import Sidebar from "@/components/ui-elements/Sidebar";
import UserHistory from "@/components/ui-elements/History";

export default function AuthenticatedHomePage() {
    return (
        <SessionProvider>
            <br />
            <div className="m-3 flex flex-row justify-center items-center"> 
                <Sidebar />
                <UserHistory />
            </div>

            {/* Bubbles */}
            <div className="fixed bottom-0 left-0 -translate-x-3/8 translate-y-3/8 h-90 w-90 rounded-full bg-black z-[-1]"></div>
            <div className="fixed bottom-30 left-0 -translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className="fixed bottom-0 left-40 translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            
            <div className="fixed top-0 right-0 translate-x-1/4 h-80 w-80 rounded-full bg-black z-[-1]"></div>
            <div className="fixed top-45 right-0 translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className="fixed top-0 right-40 -translate-y-1/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className="fixed top-0 right-70 -translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className="fixed top-0 right-0 -translate-y-1/4 h-50 w-50 bg-black z-[-1]"></div>
        </SessionProvider>
    );
}
