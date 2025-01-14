import React from 'react';
import { Brain, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-gray-800 bg-background/95 backdrop-blur-sm fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-accent" />
          <span className="text-xl font-bold">Bizimate</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          
        </nav>
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}