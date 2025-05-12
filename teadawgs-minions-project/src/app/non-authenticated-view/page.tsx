"use client"
import Image from 'next/image';
import SplashBG from '@/assets/splashBG.jpg';

export default function NonAuthenticatedView () {
    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full z-[-1]">
                <Image
                    src={SplashBG}
                    alt={"Stock Photos Background"}
                    fill
                    priority={true}
                    className = "object-cover "
                />
            </div>
        </>
    );
}