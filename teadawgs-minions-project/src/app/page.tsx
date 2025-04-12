"use client"
import Sidebar from "../components/ui-elements/Sidebar";
import Header from "../components/ui-elements/Header";
import { useState } from "react";

export default function Home() {
  // Simulate authentication state
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Header authenticated = {authenticated}/>
      <Sidebar />
      
    </>
  );
}
