import UserPost from "@/components/UserPost";
import Header from "@/components/ui-elements/Header";
import Sidebar from "@/components/ui-elements/Sidebar";

export default function AuthenticatedHomePage() {
    return(
        <>
            <Header authenticated={true} />
            <br></br>
            
            <div className="m-3 flex flex-row justify-center items-center"> 
                <Sidebar />
                <UserPost />
            </div>
        </>
    );
}