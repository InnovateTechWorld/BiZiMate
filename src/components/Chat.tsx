import React, { useState, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { formatModelResponse } from '../utils/textFormatting';

type Message = {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const dummyResponses = [
  "Based on the market analysis, I recommend focusing on the B2B segment first. The TAM is larger and customer acquisition costs are typically lower.",
  "Your business plan shows strong potential in product development, but the marketing strategy could use more detail. Would you like me to help you develop that section?",
  "Looking at your financial projections, I notice the burn rate might be unsustainable in Q3. Let's explore some cost optimization strategies.",
  "The competitive analysis reveals a gap in the enterprise market. This could be your unique selling proposition.",
];

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [product, setProduct] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [geographicMarket, setGeographicMarket] = useState('');
  const [pricingStrategy, setPricingStrategy] = useState('');
  const [mainChannels, setMainChannels] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  React.useEffect(() => {
    const initialMessage: Message = {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI business assistant. How can I help you today? You can ask me about market research, business planning, or get insights from your documents.",
      timestamp: new Date(),
    };
    setMessages([initialMessage]);

    const storedFields = localStorage.getItem('businessFields') || sessionStorage.getItem('businessFields');
    if (storedFields) {
      const fields = JSON.parse(storedFields);
      setProduct(fields.product);
      setTargetCustomer(fields.targetCustomer);
      setGeographicMarket(fields.geographicMarket);
      setPricingStrategy(fields.pricingStrategy);
      setMainChannels(fields.mainChannels);
      setFormSubmitted(true);
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://bizi-rgdl.onrender.com/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.slice(1).map(msg => ({
            role: msg.type === 'user' ? 'user' : 'model',
            text: msg.content
          })),
          product: product || 'N/A',
          targetCustomer: targetCustomer || 'N/A',
          geographicMarket: geographicMarket || 'N/A',
          pricingStrategy: pricingStrategy || 'N/A',
          mainChannels: mainChannels || 'N/A',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-20" id="chat">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">AI Business Assistant</h2>
          
          <div className="card min-h-[500px] flex flex-col">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    message.type === 'user' ? 'bg-accent' : 'bg-gray-800'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`flex-1 p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-accent text-white ml-12'
                        : 'bg-gray-800 mr-12'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: message.type === 'assistant'
                        ? formatModelResponse(message.content)
                        : message.content
                    }}
                  >
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Bot className="w-5 h-5" />
                  <span>Typing</span>
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              )}
            </div>
            {!formSubmitted && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-4">
                  Tell us about your business
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What product or service do you offer? Be specific – the
                      more detail, the better.
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Who is your target customer? Describe their demographics
                      (age, location, income, etc.), psychographics (lifestyle,
                      values, interests), and buying behavior.
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={targetCustomer}
                      onChange={(e) => setTargetCustomer(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What is your geographic market? Local, regional,
                      national, or international?
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={geographicMarket}
                      onChange={(e) => setGeographicMarket(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What is your pricing strategy? How does it compare to
                      competitors?
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={pricingStrategy}
                      onChange={(e) => setPricingStrategy(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      What are the main channels you use (or plan to use) to
                      reach your customers? (e.g., online advertising, social
                      media, direct sales, retail partnerships)
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={mainChannels}
                      onChange={(e) => setMainChannels(e.target.value)}
                    />
                  </div>
                  <button
                    className="btn-primary p-3 rounded-lg col-span-2 md:col-span-1"
                    onClick={() => {
                      setFormSubmitted(true);
                      localStorage.setItem('businessFields', JSON.stringify({
                        product,
                        targetCustomer,
                        geographicMarket,
                        pricingStrategy,
                        mainChannels,
                      }));
                      sessionStorage.setItem('businessFields', JSON.stringify({
                        product,
                        targetCustomer,
                        geographicMarket,
                        pricingStrategy,
                        mainChannels,
                      }));
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-1"
                placeholder="Ask about market research, business planning, or document insights..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                className="btn-primary p-3 rounded-lg"
                onClick={handleSend}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {[
              'Analyze my market',
              'Review business plan',
              'Financial insights',
              'Competitor analysis',
              'Growth strategies',
              'Risk assessment'
            ].map((action) => (
              <button
                key={action}
                className="card hover:bg-gray-800 transition-colors text-sm p-3 text-center"
                onClick={() => {
                  setInput(action);
                  handleSend();
                }}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}