import Image from 'next/image';
import splashBG from '../assets/splashBG.jpg';

export default function Splash() {
    return (
        <div>
            <Image
                src={splashBG}
                alt={"Stock Photos Background"}
                fill
                priority={true}
                className = "object-cover w-full h-full z-[-1]"
            />

            <div className = "fixed bottom-0 right-0 translate-x-1/8 translate-y-1/3 h-165 w-170 rounded-full bg-red-400 justify-items-center">
                <h2 className={`font-lilita text-5xl text-black px-40 py-30 text-center`}>Tasty Exercise App for Diet and Weight Gain</h2>
            </div>

            <div className = "fixed bottom-0 right-110 translate-x-1 translate-y-5/8 h-120 w-170 rounded-full bg-red-400"></div>
            <p className="fixed bottom-2 right-20 translate-x-1 translate-y-5/8 h-130 w-250 font-roboto text-2xl pt-20 pl-25">Tea Dawgs' mission is to share and inspire health-oriented recipes. Whether you are trying to lose weight or bulk, the tea dawgs community will help you make more informed decisions about what you eat!</p>
        </div>
    );
}