"use client";
import Image from 'next/image';
import { useState, ChangeEvent, FormEvent } from 'react';

type FormData = {
    title: string;
    caption: string;
    link: string;
    visibility: 'public' | 'private';
};

type Item = FormData & {
    status: 'draft' | 'published';
    id: number;
}

export default function AddPost(){
    const [formData, setFormData] = useState<FormData>({
        title: '',
        caption: '',
        link: '',
        visibility: 'public'
    });

    const[items, setItems] = useState<Item[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const{ name, value } = e.target;
        setFormData(prev => ({...prev, [name]:value}));
    };
    const handleSubmit = (e: FormEvent, isDraft: boolean) => {
        e.preventDefault();
        const status = isDraft ? 'draft' : 'published';
        const newItem: Item = {
            ...formData,
            status,
            id: Date.now()
        };

        setItems(prev => [...prev, newItem]);
        console.log('New Item:', newItem);
        console.log('All Items:', [...items, newItem]);
        setFormData(prev => ({...prev, title: '', caption: '', link: ''}));
    };
    const imageUrls = [
        "https://media.istockphoto.com/id/1390699669/photo/assortment-of-healthy-food-for-clean-eating-flexitarian-mediterranean-diet.jpg?s=612x612&w=0&k=20&c=riJ9OUUAPS2KEDgQh7dOpsbaoDGeRPkq1x4RRVtTucE=",
        "https://media.istockphoto.com/id/480391616/photo/chopping-food-ingredients.jpg?s=612x612&w=0&k=20&c=ofjaHMXEz_CtWzO3q1fN45Yf0Rwl4TcqxZXPSPF9_FU=",
        "https://media.istockphoto.com/id/888187838/photo/i-always-start-my-day-with-a-healthy-breakfast.jpg?s=612x612&w=0&k=20&c=upmRnBuFA0paMMD_NvaCIAjFJwozuPOFnAnb8UsJUF8=",
        "https://media.istockphoto.com/id/857307942/photo/vegetarian-restaurant-food-indian-fruit-salad.jpg?s=612x612&w=0&k=20&c=xRRmFoDRhtmaaCqIeDqSdxoqVDfoS7DOwmxuD-B2jrE="
    ]

    return(
        <div className="min-h-screen bg-[#1E1E1E] p-6 text-white relative">
            <div 
                className="absolute top-0 bottom-0 w-px bg-[#555555]"
                style={{ left: '40%' }}
            ></div>

            <div 
                className="absolute h-px bg-[#555555]"
                style={{
                top: '50%',
                right: '20px',
                left: 'calc(40% + 20px)'
                }}
            ></div>
            <div className='absolute left-[15px]' style={{width: '470px', height: '700px'}}>
                {imageUrls.map((url, index) => (
                    <Image
                        key={index}
                        src={url}
                        className="absolute border-2 border-[#555555] rounded-lg"
                        style={{
                            width: '300px',
                            height: '600px',
                            left: `${index * 50}px`,
                            zIndex: index,
                            objectFit: 'cover'
                        }}
                        alt={`Image ${index + 1}`}
                        />
                ))
                }
            </div>
            <form onSubmit = {(e) => {
                e.preventDefault();
                handleSubmit(e, false);
            }}
            >
            <div 
                className="absolute"
                style={{
                left: 'calc(40% + 30px)',
                right: '30px',
                top: 'calc(20% - 100px)'
                }}
            >
                <div className="mb-1"> 
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-transparent focus:outline-none placeholder:text-[#6B6B6B]"
                    placeholder="Add a catchy Title"
                    style={{
                    fontSize: '45px',
                    lineHeight: '1.2',
                    fontWeight: 500
                    }}
                />
                </div>

                <div>
                <textarea
                    name="caption"
                    value={formData.caption}
                    onChange={handleChange}
                    className="w-full bg-transparent text-[#AAAAAA] focus:outline-none placeholder:text-[#555555] resize-none"
                    placeholder="Write your description here!"
                    rows={4}
                    style={{
                    fontSize: '30px',
                    lineHeight: '1.3'
                    }}
                ></textarea>
                </div>
            </div>
            <div className="absolute flex items-center gap-3"
                style={{
                    left:'calc(40% + 30px)',
                    right: '30px',
                    top: 'calc(50% + 25px)',
                    color: '#D8D8D8'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-14">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    <input type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full bg-transparent focus:outline-none placeholder:text-[#6B6B6B]"
                            placeholder="Add a link"
                            style={{
                            fontSize: '32px',
                            lineHeight: '1.3',
                            backgroundColor: 'transparent'
                    }}/>
            </div>
            <div className="absolute flex items-center gap-4"
                style={{
                    left: 'calc(40% + 30px)',
                    right: '30px',
                    top: 'calc(50% + 100px)',
                    color: '#D8D8D8'
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-13">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <span className="text-[#D8D8D8]"
                            style={{
                                fontSize: '20px'
                            }}>Everyone can view this post</span>
                    <div className="relative ml-4">
                        <select 
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                className="appearance-none bg-transpartent border border-[#555555] round-lg px-4 py-2 pr-8 text-[#D8D8D8] focus:outline-none focus:border-[#777777]"
                                style={{
                                    fontSize: '20px',
                                    borderRadius: '8px'
                                }}
                                >
                                    <option value="public" className="bg-[#1E1E1E]">Public</option>
                                    <option value="private" className="bg-[#1E1E1E]">Private</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none" style={{right: '8px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                    </div>
                </div>
            <div className="absolute bottom-8 w-full">
                <div className="flex justify-between gap-30"
                    style={{
                        marginLeft: 'calc(40%)',
                        marginRight: '30px'
                    }}>
                        <button type="button" onClick={(e) => handleSubmit(e, true)} className="flex justify-center items-center gap-2 bg-[#757575] px-8 py-3 rounded-lg hover:bg-[#858585] transition-colors w-[40%]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D8D8D8" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                            </svg>
                            <span className="text-[#D8D8D8] text-lg">Drafts</span>
                        </button>
                        <button type="submit" className="flex justify-center items-center gap-2 bg-[#E54747] px-8 py-3 rounded-lg hover:bg-[#F55757] transition-colors w-[40%] ml-2" style={{marginRight: 'auto'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#D8D8D8" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                            </svg>
                            <span className="text-[#D8D8D8] text-lg">Post</span>
                        </button>
                    </div>
            </div>
            </form>
            <div className="fixed inset-0 flex items-center" style={{pointerEvents: 'none'}}>
                <div className="relative ml-[15px]"
                    style={{
                        width: '470px',
                        height: '700px',
                        left: '0',
                        marginRight: 'calc(40% - 470px - 150x)'
                    }}>

                </div>
            </div>
        </div>
    )
}