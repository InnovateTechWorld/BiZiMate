import React, { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: "Hello! I'm your AI business assistant. How can I help you today? You can ask me about market research, business planning, or get insights from your documents.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: dummyResponses[Math.floor(Math.random() * dummyResponses.length)],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
                  >
                    {message.content}
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