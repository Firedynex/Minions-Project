import Header from "@/components/ui-elements/Header";
import Sidebar from "@/components/ui-elements/Sidebar";
import HistoryPage from "@/components/ui-elements/history";

export default function AuthenticatedHomePage() {
    return(
        <>
            {/*Authenticated page passes down a boolean value to Header which has the isLoggedIn variable to determine logged in state */}
            <Header authenticated={true} />
            <br></br>
            
            <div className="m-3 flex flex-row justify-center items-center"> 
                <Sidebar />
                <HistoryPage/>
            </div>

            {/* bubbles */}
            {/* bottom-left */}
            <div className = "fixed bottom-0 left-0 -translate-x-3/8 translate-y-3/8 h-90 w-90 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-30 left-0 -translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed bottom-0 left-40 translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            
            {/* top-right */}
            <div className = "fixed top-0 right-0 translate-x-1/4 h-80 w-80 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-45 right-0 translate-x-5/8 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-40 -translate-y-1/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-70 -translate-y-3/4 h-50 w-50 rounded-full bg-black z-[-1]"></div>
            <div className = "fixed top-0 right-0 -translate-y-1/4 h-50 w-50 bg-black z-[-1]"></div>
        </>
    );
}