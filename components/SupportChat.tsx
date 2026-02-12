
import React, { useState, useRef, useEffect } from 'react';
import { SupportMessage } from '../types';
import { simulateWhatsAppResponse } from '../services/simulationService';
import { 
  Send, 
  MessageSquare, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  ShieldCheck,
  Check
} from 'lucide-react';

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([
    { id: '1', sender: 'AI', text: "Hello! Welcome to PSI Federal WhatsApp Banking. How can I help you today?", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: SupportMessage = {
      id: Date.now().toString(),
      sender: 'MEMBER',
      text: input,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await simulateWhatsAppResponse(input);
      const aiMsg: SupportMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'AI',
        text: response,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[700px] flex flex-col bg-[#E5DDD5] rounded-[40px] shadow-2xl overflow-hidden border border-slate-200">
      {/* Chat Header */}
      <div className="bg-[#075E54] p-6 text-white flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-black">Ψ</div>
          <div>
            <h3 className="font-bold">PSI Federal Assistant</h3>
            <p className="text-[10px] text-white/60 font-medium flex items-center gap-1">
              <ShieldCheck size={10} /> End-to-end encrypted
            </p>
          </div>
        </div>
        <div className="flex gap-4 opacity-80">
           <Video size={20} />
           <Phone size={20} />
           <MoreVertical size={20} />
        </div>
      </div>

      {/* Message Feed */}
      <div ref={scrollRef} className="flex-1 p-8 space-y-4 overflow-y-auto scrollbar-hide">
        <div className="flex justify-center mb-6">
           <span className="bg-[#D1E9F6] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase text-slate-500 shadow-sm border border-slate-200">Today</span>
        </div>
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'MEMBER' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
             <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm relative ${
               msg.sender === 'MEMBER' ? 'bg-[#DCF8C6] rounded-tr-none' : 'bg-white rounded-tl-none'
             }`}>
               <p className="text-sm text-slate-800 leading-relaxed">{msg.text}</p>
               <div className="flex items-center justify-end gap-1 mt-2">
                 <span className="text-[9px] text-slate-400 font-bold">
                   {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </span>
                 {msg.sender === 'MEMBER' && <Check size={10} className="text-[#34B7F1]" />}
               </div>
             </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white px-4 py-2 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
               <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
               <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-[#F0F0F0] p-6 flex items-center gap-4 shrink-0">
        <Paperclip size={24} className="text-slate-400" />
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Type a message"
            className="w-full py-4 px-6 bg-white rounded-full outline-none text-sm border border-slate-200 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
        </div>
        <button 
          onClick={handleSend}
          className="w-14 h-14 bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition active:scale-95"
        >
          <Send size={24} />
        </button>
      </div>
    </div>
  );
};

export default SupportChat;
