'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";

const session = await getSession();

export default function Sidebar() {
  const [showOptions, setShowOptions] = useState(false);
  const id = session?.user?.id;

  return (
    <div className="flex flex-col items-center gap-20 bg-red-400 w-40 h-full rounded-4xl relative py-8">
      <Link href={`/personal-info-page/${id}`}>
        <Image 
          src="/profile_icon.svg"
          alt="Profile Icon"
          width={100}
          height={100}
          className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </Link>
      <Link href="/authenticated-view">
        <Image
          src="/home_icon.svg"
          alt="Home icon"
          width={100}
          height={100}
          className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </Link>

      <Link href="/history">
        <Image
          src="/history_icon.svg"
          alt="History icon"
          width={100}
          height={100}
          className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
      </Link>

      {/* Add Post Menu */}
      <div className="relative">
        <Image
          src="/add_icon.svg"
          alt="Add post icon"
          width={100}
          height={100}
          onClick={() => setShowOptions((prev) => !prev)}
          className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        />

        {/* Dropdown menu */}
        {showOptions && (
          <div className="absolute right-24 top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md rounded-lg z-50">
            <Link href="/add-post" className="bg-red block px-4 py-2 hover:bg-gray-200">
              Add Post
            </Link>
            <Link href="/add-recipe" className="bg-red block px-4 py-2 hover:bg-gray-200">
              Add Recipe
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
