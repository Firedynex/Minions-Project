export default function AddPost(){
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
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-14">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <input type="url"
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-13">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <span className="text-[#D8D8D8]"
                    style={{
                        fontSize: '20px'
                    }}>Everyone can view this post</span>
            <div className="relative ml-4">
                <select className="appearance-none bg-transpartent border border-[#555555] round-lg px-4 py-2 pr-8 text-[#D8D8D8] focus:outline-none focus:border-[#777777]"
                        style={{
                            fontSize: '20px',
                            borderRadius: '8px'
                        }}
                        defaultValue="public">
                            <option value="public" className="bg-[#1E1E1E]">Public</option>
                            <option value="private" className="bg-[#1E1E1E]">Private</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none" style={{right: '8px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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
                    <button className="flex justify-center items-center gap-2 bg-[#757575] px-8 py-3 rounded-lg hover:bg-[#858585] transition-colors w-[40%]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D8D8D8" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                        </svg>
                        <span className="text-[#D8D8D8] text-lg">Drafts</span>
                    </button>
                    <button className="flex justify-center items-center gap-2 bg-[#E54747] px-8 py-3 rounded-lg hover:bg-[#F55757] transition-colors w-[40%] ml-2" style={{marginRight: 'auto'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#D8D8D8" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
                        </svg>
                        <span className="text-[#D8D8D8] text-lg">Post</span>
                    </button>
                </div>
        </div>
</div>
    )
}