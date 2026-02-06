import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { getGeminiReply, listGeminiModels } from '../lib/gemini';

const INITIAL_MESSAGES = [
  { 
    id: 1, 
    role: 'bot', 
    content: "Hi there. I'm your PeaceNet AI companion. I'm here to listen, offer support, and help you navigate difficult digital situations. I'm not a therapist, but I can provide resources and strategies. How are you feeling today?" 
  }
];

const SUGGESTED_PROMPTS = [
  "I received a hateful message.",
  "How can I help a bullied friend?",
  "I feel overwhelmed by social media.",
  "Is this considered hate speech?"
];

export function AISupportAgent() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listGeminiModels();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const reply = await getGeminiReply([...messages, userMsg]);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content: reply || "I'm here with you. Could you share a bit more?",
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'bot',
          content:
            "I'm sorry, I'm having trouble responding right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] flex flex-col bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-emerald-50/50">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <Bot className="w-6 h-6" />
           </div>
           <div>
              <h2 className="font-bold text-stone-900">PeaceNet AI</h2>
              <p className="text-xs text-stone-500 flex items-center gap-1">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 Online & Ready to help
              </p>
           </div>
        </div>
        <button 
           onClick={() => setMessages(INITIAL_MESSAGES)}
           className="text-xs font-medium text-stone-400 hover:text-stone-600"
        >
           Clear Chat
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" ref={scrollRef}>
         {messages.map((msg) => (
            <motion.div 
               key={msg.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
               <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-stone-200 text-stone-600' : 'bg-emerald-100 text-emerald-600'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
               </div>
               <div className={`p-4 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-stone-900 text-white rounded-tr-none' : 'bg-stone-100 text-stone-800 rounded-tl-none'}`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
               </div>
            </motion.div>
         ))}
         
         {isTyping && (
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }}
               className="flex gap-3"
            >
               <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4" />
               </div>
               <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </motion.div>
         )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-stone-100 bg-white">
         {messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
               {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button 
                     key={i} 
                     onClick={() => handleSend(prompt)}
                     className="px-4 py-2 bg-stone-50 hover:bg-emerald-50 border border-stone-100 hover:border-emerald-200 text-stone-600 hover:text-emerald-700 text-sm rounded-full whitespace-nowrap transition-colors"
                  >
                     {prompt}
                  </button>
               ))}
            </div>
         )}
         
         <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2 items-center bg-stone-50 p-2 rounded-2xl border border-stone-200 focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all"
         >
            <input 
               type="text" 
               className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-stone-800 placeholder-stone-400"
               placeholder="Type your message..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
            />
            <button 
               type="submit"
               disabled={!input.trim() || isTyping}
               className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 transition-all shadow-sm"
            >
               <Send className="w-4 h-4" />
            </button>
         </form>
         <p className="text-[10px] text-center text-stone-400 mt-2">
            PeaceNet AI can make mistakes. Consider checking important information with a professional.
         </p>
      </div>
    </div>
  );
}
