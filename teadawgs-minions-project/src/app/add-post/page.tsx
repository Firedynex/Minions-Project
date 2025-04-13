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
    {/* Title Input - 45px */}
    <div className="mb-1"> {/* Reduced gap further */}
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

    {/* Caption Textarea - 30px */}
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
</div>
    )
}