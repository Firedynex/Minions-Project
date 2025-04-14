"use client"
import Sidebar from "../components/ui-elements/Sidebar";
import Header from "../components/ui-elements/Header";
import UserPost from "@/components/UserPost";
import { useState } from "react";

export default function Home() {
  // Simulate authentication state
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Header authenticated = {authenticated}/>
      <div className="m-3 flex flex-row justify-center items-center"> 
                <Sidebar />
                <UserPost />
      </div>
    </>
  );
}
