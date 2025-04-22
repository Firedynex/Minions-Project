"use client"
import { useState } from "react";
import Splash from "@/components/Splash";
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  connectMongoDB();
  // Simulate authentication state
  const [authenticated, setAuthenticated] = useState(false);
  return (
    <>
      <Splash/>
    </>
  );
}
