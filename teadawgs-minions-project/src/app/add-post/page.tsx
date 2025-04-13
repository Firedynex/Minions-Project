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
            top: 'calc(50% + 20px)',
            color: '#D8D8D8'
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
            </svg>
            <input type="url"
                    className="w-full bg-transparent focus:outline-none placeholder:text-[#6B6B6B]"
                    placeholder="Add a link"
                    style={{
                    fontSize: '24px',
                    lineHeight: '1.3',
                    backgroundColor: 'transparent'
            }}/>

    </div>
    <div className="absolute flex items-center gap-3"
        style={{
            left: 'calc(40% + 30px)',
            right: '30px',
            top: 'calc(50% + 70px)',
            color: '#D8D8D8'
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
            <span className="text-[#D8D8D8] text-lg">Everyone can view this post</span>
            <select className="ml-4 bg-transpartent border-[#555555] round px-3 py-1 text-[#D8D8D8] focus:outline-none"
                    defaultValue="public">
                        <option value="public" className="bg-[#1E1E1E]">Public</option>
                        <option value="private" className="bg-[#1E1E1E]">Private</option>
            </select>
        </div>
</div>
    )
}