"use client"
import Sidebar from "./ui-elements/sidebar";
import Header from "./ui-elements/header";
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
