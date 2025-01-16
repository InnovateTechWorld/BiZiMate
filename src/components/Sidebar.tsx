import React, { useState } from 'react';
import { 
  BarChart2, 
  FileUp, 
  MessageSquare, 
  History, 
  HelpCircle,
  Menu, // Add Menu icon for toggle button
} from 'lucide-react';

type Page = 'market-research' | 'document-upload' | 'chat' | 'saved-chats' | 'faq';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'market-research', label: 'Market Research', icon: BarChart2 },
    { id: 'document-upload', label: 'Document Upload', icon: FileUp },
    { id: 'chat', label: 'Chat Assistant', icon: MessageSquare },
    { id: 'saved-chats', label: 'Saved Chats', icon: History },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ] as const;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 p-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside className={`fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 pt-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-0 -translate-x-full'
      }`}>
        <div className="flex items-center gap-2 px-6 mb-8">
        </div>
        
        <nav className="px-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                currentPage === item.id
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className={`${!isOpen ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}