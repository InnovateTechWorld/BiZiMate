import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MarketResearch } from './components/MarketResearch';
import { DocumentUpload } from './components/DocumentUpload';
import { Chat } from './components/Chat';
import { SavedChats } from './components/SavedChats';
import { FAQ } from './components/FAQ';

type Page = 'home' | 'market-research' | 'document-upload' | 'chat' | 'saved-chats' | 'faq';

const HeroPage = ({ onGetStarted }: { onGetStarted: () => void }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Platform</h1>
      <p className="text-xl mb-8">Your all-in-one solution for market research and document management</p>
      <button 
        onClick={onGetStarted}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Get Started
      </button>
    </div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'market-research':
        return <MarketResearch />;
      case 'document-upload':
        return <DocumentUpload />;
      case 'chat':
        return <Chat />;
      case 'saved-chats':
        return <SavedChats />;
      case 'faq':
        return <FAQ />;
    }
  };

  if (currentPage === 'home') {
    return <HeroPage onGetStarted={() => setCurrentPage('market-research')} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="flex-1 p-8 ml-64">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;