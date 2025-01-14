import React, { useState } from 'react';
import { Search, TrendingUp, Users, Building } from 'lucide-react';

const industries = [
  'Technology',
  'Retail',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Education',
];

const dummyInsights = {
  Technology: {
    growth: '22%',
    marketSize: '$4.5T',
    topCompetitors: ['Apple', 'Microsoft', 'Google'],
    trends: ['AI/ML', 'Cloud Computing', '5G'],
  },
  Retail: {
    growth: '15%',
    marketSize: '$26T',
    topCompetitors: ['Amazon', 'Walmart', 'Alibaba'],
    trends: ['E-commerce', 'Mobile Shopping', 'Same-day Delivery'],
  },
};

export function MarketResearch() {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (selectedIndustry) {
      setShowResults(true);
    }
  };

  return (
    <section className="py-20" id="research">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Market Research</h2>
          
          <div className="card mb-8">
            <div className="flex gap-4">
              <select 
                className="input flex-1"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                <option value="">Select an industry...</option>
                {industries.map(industry => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
              <button 
                className="btn-primary flex items-center gap-2"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {showResults && selectedIndustry && dummyInsights[selectedIndustry] && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-semibold">Market Growth</h3>
                </div>
                <p className="text-3xl font-bold text-accent">
                  {dummyInsights[selectedIndustry].growth}
                </p>
                <p className="text-gray-400 mt-2">Annual growth rate</p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <Building className="w-5 h-5 text-accent" />
                  <h3 className="text-xl font-semibold">Market Size</h3>
                </div>
                <p className="text-3xl font-bold text-accent">
                  {dummyInsights[selectedIndustry].marketSize}
                </p>
                <p className="text-gray-400 mt-2">Global market value</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}