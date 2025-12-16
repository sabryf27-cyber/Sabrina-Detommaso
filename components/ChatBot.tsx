import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: 'model', text: 'Ciao! Sono l\'assistente AI di Sabrina. Posso spiegarti i suoi progetti, il suo metodo o le sue competenze tecniche. Chiedimi pure!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass recent history for context
      const recentHistory = messages.slice(-10); // keep last 10 turns context
      const responseText = await sendMessageToGemini(recentHistory, userMsg.text);
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Scusa, ho avuto un piccolo problema tecnico. Riprova tra un attimo." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Invitation Bubble - Visible when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-20 right-5 md:bottom-24 md:right-8 z-[90] pointer-events-none animate-bounce">
          <div className="bg-white text-deepBlue px-4 py-2 rounded-xl rounded-tr-none shadow-xl border border-slate-200 text-sm font-bold relative">
            Dubbi? Chiedimi pure!
            <div className="absolute -bottom-2 right-0 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-white border-r-0"></div>
          </div>
        </div>
      )}

      {/* Trigger Button - Optimized for Mobile touch targets and High Z-Index */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-5 md:bottom-8 md:right-8 z-[100] bg-techGreen text-deepBlue p-4 rounded-full shadow-lg shadow-techGreen/20 hover:scale-105 transition-transform flex items-center gap-2 font-bold"
        aria-label="Apri Assistente AI"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {/* On mobile show only icon, on larger screens show text */}
        <span className="hidden md:inline">Chiedi all'AI</span>
      </button>

      {/* Chat Window - Fully Responsive */}
      {isOpen && (
        <div className="fixed z-[100] flex flex-col overflow-hidden animate-slideUp bg-slateBlue border border-slate-700 rounded-2xl shadow-2xl
          /* Mobile Styles: Left/Right 1rem, Bottom 5.5rem, dynamic height */
          bottom-24 left-4 right-4 h-[60vh]
          /* Tablet/Desktop Styles: Fixed width, positioned right */
          md:left-auto md:right-6 md:w-96 md:h-[500px]"
        >
          
          {/* Header */}
          <div className="bg-[#020617] p-4 border-b border-slate-700 flex items-center gap-3 shrink-0">
            <div className="p-2 bg-techGreen/10 rounded-full">
              <Bot className="text-techGreen" size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Sabrina's AI Agent</h3>
              <p className="text-coolGray text-xs">Powered by Gemini</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-slateBlue scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-techGreen text-deepBlue font-medium rounded-br-none' 
                      : 'bg-slate-700 text-pearlGray rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none">
                  <Loader2 className="animate-spin text-techGreen" size={18} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-[#020617] border-t border-slate-700 flex gap-2 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Chiedi dei progetti..."
              className="flex-grow bg-slate-800 text-white text-sm rounded-lg px-3 py-3 md:py-2 focus:outline-none focus:ring-1 focus:ring-techGreen border border-transparent placeholder:text-slate-500"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-techGreen text-deepBlue p-2 md:p-2 rounded-lg hover:bg-green-400 disabled:opacity-50 transition-colors flex items-center justify-center w-12"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;