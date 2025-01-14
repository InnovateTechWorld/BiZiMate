import React from 'react';
import { MessageSquare, Download, Trash2, Play } from 'lucide-react';

const dummyChats = [
  {
    id: 1,
    topic: 'Business Plan',
    lastMessage: 'Analysis of Q3 financial projections',
    date: '2024-03-15',
    category: 'Planning',
  },
  {
    id: 2,
    topic: 'Marketing Strategy',
    lastMessage: 'Social media campaign recommendations',
    date: '2024-03-14',
    category: 'Marketing',
  },
  {
    id: 3,
    topic: 'Market Analysis',
    lastMessage: 'Competitor landscape overview',
    date: '2024-03-13',
    category: 'Research',
  },
];

export function SavedChats() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Saved Conversations</h2>
      
      <div className="grid gap-6">
        {dummyChats.map((chat) => (
          <div key={chat.id} className="card">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-accent">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{chat.topic}</h3>
                  <p className="text-gray-400 mb-2">{chat.lastMessage}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{chat.date}</span>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-800">
                      {chat.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Continue Conversation">
                  <Play className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors" title="Download Summary">
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-red-400" title="Delete Chat">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}