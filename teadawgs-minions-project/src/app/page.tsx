"use client"
import Splash from "@/components/Splash";
import connectMongoDB from "../../config/mongodb";

export default function Home() {
  connectMongoDB();
  return (
    <>
      <Splash/>  
    </>
  );
}
