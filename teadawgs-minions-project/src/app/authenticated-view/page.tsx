import UserPost from "@/components/UserPost";
import Header from "@/components/ui-elements/Header";
import Sidebar from "@/components/ui-elements/Sidebar";
import Header from "@/components/ui-elements/Header";

export default function AuthenticatedHomePage() {
    return(
        <>
            <Header authenticated={true} />
            <br></br>
            <Sidebar />
            <div className="flex flex-row justify-center items-center bg-red-400 ">
                
            </div>
        </>
    );
}