"use client"
import Header from "../components/ui-elements/Header";
import { useState } from "react";
import Splash from "@/components/Splash";
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  connectMongoDB();
  // Simulate authentication state
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Header authenticated = {authenticated}/>
      <Splash/>
    </>
  );
}
