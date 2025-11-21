import React, { useState, useRef, useEffect } from 'react';
import { DreamType, ChatMessage } from '../types';
import { streamMathExplanation } from '../services/geminiService';
import { Send, Sparkles, BookOpen, HelpCircle } from 'lucide-react';

interface GeminiTutorProps {
  type: DreamType;
}

const GeminiTutor: React.FC<GeminiTutorProps> = ({ type }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Hello! I am your math tutor. Ask me about the proof, the intuition behind x⁻ˣ, or why this is called a "Dream"!',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat when topic changes
  useEffect(() => {
    setMessages([{
      role: 'model',
      text: type === DreamType.FIRST 
        ? "We are looking at the First Identity: ∫ x⁻ˣ dx. Curious about its connection to infinite sums?"
        : "This is the Second Identity: ∫ xˣ dx. The terms alternate signs here. Ask me why!",
      timestamp: Date.now()
    }]);
  }, [type]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let fullResponse = "";
      const modelMsgIndex = messages.length + 1; // Placeholder index
      
      // Add placeholder for streaming
      setMessages(prev => [...prev, { role: 'model', text: '', timestamp: Date.now() }]);

      const stream = streamMathExplanation(type, text);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = fullResponse;
          return newMsgs;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Explain the proof simply",
    "Why is it called Sophomore's Dream?",
    "What is the limit of x^x at 0?"
  ];

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 backdrop-blur-sm flex flex-col h-[600px]">
      <div className="p-4 border-b border-slate-800 flex items-center space-x-2">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <Sparkles className="text-indigo-400" size={20} />
        </div>
        <div>
          <h3 className="text-slate-200 font-semibold">AI Math Tutor</h3>
          <p className="text-slate-500 text-xs">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-sm' 
                  : 'bg-slate-800 text-slate-200 rounded-tl-sm border border-slate-700'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto scrollbar-thin">
        {suggestions.map(s => (
          <button 
            key={s}
            onClick={() => handleSendMessage(s)}
            disabled={isLoading}
            className="whitespace-nowrap px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-400 hover:bg-slate-700 hover:text-brand-300 transition-colors flex items-center"
          >
            <HelpCircle size={12} className="mr-1" />
            {s}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-lg border border-slate-800 focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
            placeholder="Ask about the math..."
            className="flex-1 bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 text-sm"
            disabled={isLoading}
          />
          <button 
            onClick={() => handleSendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="p-2 bg-brand-600 hover:bg-brand-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-md transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiTutor;
