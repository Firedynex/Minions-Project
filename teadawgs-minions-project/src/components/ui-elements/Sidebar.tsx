import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
    return (
        <div className="flex flex-col align-center justify-center items-center gap-20 bg-red-400 w-1/13 h-150 rounded-4xl">
            <a>
                <Image 
                    src="/home_icon.svg"
                    alt="Home icon"
                    width={100}
                    height={100}
                    className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
            </a>
            <a>
                <Image 
                    src="/make_food.svg"
                    alt="Make food icon"
                    width={100}
                    height={100}
                    className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
            </a>
            <a>
                <Image 
                    src="/history_icon.svg"
                    alt="History icon"
                    width={100}
                    height={100}
                    className="w-20 h-20 hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
            </a>
            <Link href="/create-post">
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