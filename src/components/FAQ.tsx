import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const faqData = {
  'Business Plans': [
    {
      question: 'What should a business plan include?',
      answer: 'A comprehensive business plan should include an executive summary, company description, market analysis, organization structure, service/product line, marketing strategy, funding requirements, and financial projections.',
    },
    {
      question: 'How often should I update my business plan?',
      answer: 'You should review and update your business plan at least annually, or more frequently if there are significant market changes or business pivots.',
    },
  ],
  'Financial Tools': [
    {
      question: 'What financial metrics should I track?',
      answer: 'Key financial metrics include revenue, profit margins, cash flow, burn rate, customer acquisition cost (CAC), lifetime value (LTV), and return on investment (ROI).',
    },
    {
      question: 'How do I create financial projections?',
      answer: 'Financial projections should be based on historical data, market research, and realistic growth assumptions. Include projected revenue, expenses, and cash flow statements.',
    },
  ],
  'Market Research': [
    {
      question: 'How do I identify my target market?',
      answer: 'Define your target market by analyzing demographics, psychographics, buying behavior, and needs. Create detailed customer personas and validate your assumptions through market research.',
    },
    {
      question: 'What are the best market research methods?',
      answer: 'Effective market research methods include surveys, interviews, focus groups, competitor analysis, and industry reports. Use a combination of primary and secondary research.',
    },
  ],
};

export function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Knowledge Base</h2>
      
      <div className="relative mb-8">
        <input
          type="text"
          className="input pl-12"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      <div className="space-y-8">
        {Object.entries(faqData).map(([category, items]) => (
          <div key={category} className="card">
            <h3 className="text-xl font-semibold mb-4">{category}</h3>
            <div className="space-y-4">
              {items.map((item, index) => {
                const itemId = `${category}-${index}`;
                return (
                  <div key={itemId} className="border-b border-gray-800 last:border-0 pb-4 last:pb-0">
                    <button
                      className="w-full flex items-center justify-between text-left"
                      onClick={() => toggleItem(itemId)}
                    >
                      <span className="font-medium">{item.question}</span>
                      {expandedItems[itemId] ? (
                        <ChevronUp className="w-5 h-5 text-accent" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-accent" />
                      )}
                    </button>
                    {expandedItems[itemId] && (
                      <p className="mt-2 text-gray-400">{item.answer}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}