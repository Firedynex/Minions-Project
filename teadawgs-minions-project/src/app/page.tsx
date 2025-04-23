"use client"
import Splash from "@/components/Splash";
import connectMongoDB from "../../config/mongodb";
import { useRouter } from "next/navigation";

export default function Home() {
  connectMongoDB();
  const router = useRouter();
  return (
    <>
      <Splash/>
      {/* non-authenticate post view */}
      <button onClick={() => router.push("/non-authenticated-view")} className="flex items-center justify-between border-solid border-2 border-black rounded-full bg-black p-2 hover:bg-gray-700 transition duration-300 m-4 cursor-pointer">
                            <span className={`font-roboto text-xl`}>View Posts</span>
                        </button>
      
    </>
  );
}
