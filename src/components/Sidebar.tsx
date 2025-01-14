import React from 'react';
import { 
  BarChart2, 
  FileUp, 
  MessageSquare, 
  History, 
  HelpCircle,
  Brain
} from 'lucide-react';

type Page = 'market-research' | 'document-upload' | 'chat' | 'saved-chats' | 'faq';

interface SidebarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const menuItems = [
    { id: 'market-research', label: 'Market Research', icon: BarChart2 },
    { id: 'document-upload', label: 'Document Upload', icon: FileUp },
    { id: 'chat', label: 'Chat Assistant', icon: MessageSquare },
    { id: 'saved-chats', label: 'Saved Chats', icon: History },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 border-r border-gray-800 pt-20">
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
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}