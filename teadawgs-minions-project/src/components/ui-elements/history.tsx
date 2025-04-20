"use client";
import Image from 'next/image';

export default function UserHistory() {
  const historyItems = [
    {
      id: 1,
      type: 'recipe',
      title: 'placeholder',
      preview: 'Beginning of post text...',
      viewedAt: 'time since viewing',
      image: '/placeholder.svg',
      category: 'Post'
    },
    {
        id: 2,
        type: 'recipe',
        title: 'placeholder',
        preview: 'Beginning of post text...',
        viewedAt: 'time since viewing',
        image: '/placeholder.svg',
        category: 'Post'
      },
  ];

  return (
    <div className="min-h-150 bg-black text-gray-100 p-4 max-w-4xl m-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-red-400 border-b text-center">Viewing History</h1>
          <p className="text-gray-400 mt-2 text-center">Recently viewed recipes and posts</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative left-13">
          {/* Main History List */}
          <div className="lg:col-span-3 space-y-6 ">
            {historyItems.map((item) => (
              <div 
                key={item.id}
                className="bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-800 transition-colors"
              >
                <div className="flex gap-6">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 relative shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                      sizes="(max-width: 768px) 100vw, 10vw"
                    />
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm px-3 py-1 bg-red-500/20 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {item.viewedAt}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-red-300">
                      {item.title}
                    </h2>
                    
                    <p className="text-gray-300 mt-2 line-clamp-2">
                      {item.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}