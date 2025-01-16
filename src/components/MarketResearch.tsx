import React, { useState , useRef } from 'react';
import { Search, TrendingUp, Users, Building } from 'lucide-react';

export function MarketResearch() {
  const [industry, setIndustry] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [audienceRegion, setAudienceRegion] = useState('');
  const [insights, setInsights] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);


  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://bizi-rgdl.onrender.com/market', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ industry, focusKeyword, audienceRegion }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      
            const data = await response.json();
            setInsights(data);
            setTimeout(() => {
              resultsRef.current?.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }, 100);

          } catch (error) {
            console.error('Error fetching market insights:', error);
          } finally {
            setLoading(false);
          }
        };
  return (
    <section className="py-20" id="research">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Market Research</h2>
          
            <div className="card mb-8 p-4">
            <div className="grid grid-cols-1 gap-6">
              <div>
              <label className="block text-sm font-medium mb-1">
                Industry
                <span className="block text-xs text-gray-500 mt-1">
                (e.g., Healthcare, Technology, Education)
                </span>
              </label>
              <input
                type="text"
                className="input w-full"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Enter industry"
              />
              </div>
              <div>
              <label className="block text-sm font-medium mb-1">
                Focus Keyword 
                <span className="block text-xs text-gray-500 mt-1">
                A specific term to analyze (e.g., "sustainable packaging")
                </span>
              </label>
              <input
                type="text"
                className="input w-full"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="Enter focus keyword"
              />
              </div>
              <div>
              <label className="block text-sm font-medium mb-1">
                Audience Region
                <span className="block text-xs text-gray-500 mt-1">
                Enter a location or demographic group
                </span>
              </label>
              <input
                type="text"
                className="input w-full"
                value={audienceRegion}
                onChange={(e) => setAudienceRegion(e.target.value)}
                placeholder="E.g., USA, Europe, 18-35-year-olds"
              />
              </div>
              <div className="mt-2">
              <button
                className="btn-primary w-full sm:w-auto px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                onClick={handleSearch}
                disabled={loading}
              >
                <Search className="w-5 h-5" />
                <span>Search Market Insights</span>
              </button>
              </div>
            </div>
            </div>

            {loading && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/70 z-50">
              <p>Loading...</p>
            </div>
          )}
          {insights && !loading && (
            <div ref={resultsRef} className="grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">
                  Current trends in the industry
                </h3>
                <ul>
                  {insights.trends.map((trend: string, index: number) => (
                    <li key={index}>• {trend}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">
                  Top competitors or popular companies in the niche
                </h3>
                <ul>
                  {insights.competitors.map((competitor: string, index: number) => (
                    <li key={index}>• {competitor}</li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">
                  Consumer sentiment or interest level
                </h3>
                <p>{insights.sentiment}</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2">
                  Popular search queries or topics
                </h3>
                <ul>
                  {insights.queries.map((query: string, index: number) => (
                    <li key={index}>• {query}</li>
                  ))}
                </ul>
              </div>
              <div className="card md:col-span-2">
                <h3 className="text-xl font-semibold mb-2">
                  Suggestions for user action or strategy
                </h3>
                <ul>
                  {insights.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}