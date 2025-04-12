import UserPost from "@/components/UserPost";
import Sidebar from "@/components/ui-elements/Sidebar";

export default function AuthenticatedHomePage() {
    return(
        <>
            <Sidebar />
            <div className="flex flex-row justify-center items-center bg-red-400 ">
                <UserPost />
            </div>
        </>
    );
}