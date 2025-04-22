'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from 'next/navigation';

interface UserProps {
    user: {
        _id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }
}

export default function Sidebar() {
  const [showOptions, setShowOptions] = useState(false);
  const [user, setUser] = useState<UserProps['user'] | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.log('Error from ShowUserDetails', error);
      }
    };

    if (id) fetchUser();
  }, [id]);

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
      <Link href="/add-recipe">
        <Image
          src="/add_icon.svg"
          alt="Add post icon"
          width={100}
          height={100}
          className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
        />
        </Link>
    </div>
  );
}
