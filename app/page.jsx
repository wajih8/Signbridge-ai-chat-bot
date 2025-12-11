"use client";
import { useState, useEffect, useRef } from "react";
import { Send, Plus, MessageSquare, EarOff, Lightbulb, User, Settings, Search, Menu } from "lucide-react";
import { useSession,signOut } from "next-auth/react";
import TypewriterMessage from "./components/TypewriterMessage";

export default function ChatInterface() {
  const { data: session } = useSession();

  const[loads,setLoads]=useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userId, setUserId] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); 
  const [chatId, setChatId] = useState(null);
  const [history, setHistory] = useState([]); 
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);
  const [userProfile, setUserProfile] = useState({
    displayName: "Sidi Wajih", 
    initial: "S", 
  });
useEffect(() => {
    if (session?.user) {
      setUserProfile({
        displayName: session.user.name,
        initial: session.user.initial,
      });

      setUserId(session.user.id);
    }
  }, [session]);

  
  useEffect(() => { fetchHistory(); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("/api/chat/history");
      const data = await res.json();
      if (data.chats) setHistory(data.chats);
    } catch (error) { console.error("Failed to load history", error); }
  };
const handleSignOut =async () => {
    await signOut({ redirect: false,callbackUrl: "/login" });
  };
  const startNewChat = () => {
    setChatId(null);
    setMessages([]);
  };

  const loadChat = (selectedChat) => {
    setChatId(selectedChat._id);
    setMessages(selectedChat.messages.map(msg => ({ role: msg.role, content: msg.parts })));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput("");
    
    // Add User Message
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, chatId: chatId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "model", content: data.response }]);
      if (!chatId && data.chatId) { setChatId(data.chatId); fetchHistory(); }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", content: "Error connecting to AI." }]);
    } finally { setIsLoading(false); }
  };

  // --- SUGGESTION CARDS DATA (Matching your image) ---
  const suggestions = [
    { title: "Deaf Helper", desc: "Deaf Person (Seeking Help).", icon: <EarOff className="w-5 h-5 text-blue-400"/> },
    { title: "Mother", desc: "Mother (Understanding Child).", icon: <Lightbulb className="w-5 h-5 text-purple-400"/> },
    { title: "Parent", desc: "Parent (Autistic Child).", icon: <User  className="w-5 h-5 text-green-400"/> },
  ];
  if (!session) return <p>Loading...</p>;

  return (
    <div className="flex h-screen overflow-hidden text-gray-200 font-sans">
      
      {/* --- SIDEBAR (Matches Image Left Panel) --- */}
      <aside className={`${isSidebarOpen ? "w-[280px]" : "w-0"} bg-[#0b0b0c] flex flex-col transition-all duration-300 border-r border-white/5 relative z-20`}>
        <div className="p-4 flex items-center justify-between">
          <button onClick={startNewChat} className="flex items-center gap-2 bg-[#1e1f20] hover:bg-[#2a2b2e] text-sm px-4 py-2 rounded-full transition-colors border border-white/10 w-full">
            <Plus className="w-4 h-4 text-blue-400" />
            <span>New Chat</span>
          </button>
        </div>

        {/* Search Mockup */}
        <div className="px-4 mb-4">
          <div className="flex items-center bg-[#1e1f20] rounded-lg px-3 py-2 text-sm text-gray-500">
            <Search className="w-4 h-4 mr-2" />
            <span>Search history...</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <div className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Recents</div>
          {history.map((chat) => (
            <button
              key={chat._id}
              onClick={() => loadChat(chat)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 text-sm flex items-center gap-3 transition-all truncate
                ${chatId === chat._id ? "bg-[#2a2b2e] text-blue-100" : "hover:bg-[#1a1b1d] text-gray-400 hover:text-gray-200"}`}
            >
              <MessageSquare className="w-4 h-4 min-w-[16px]" />
              <span className="truncate">{chat.title || chat.messages[0]?.parts.substring(0, 25) || "Conversation"}...</span>
            </button>
          ))}
        </div>

        {/* User Profile at Bottom */}
       
{/* User Profile at Bottom */}
<div className="p-4 border-t border-white/5">
  <div 
    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1f20] cursor-pointer transition-colors"
    // Optional: Add an onClick handler here if you want the whole row to toggle the menu
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold">
      
    </div>
    <div className="flex-1 text-sm">
      <div className="font-medium text-white">{userProfile.displayName}</div>
    </div>
    
    {/* --- MODIFIED SETTINGS BUTTON AREA --- */}
    <div className="relative"> 
      <button 
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
        className="p-1 rounded-full hover:bg-[#2a2b2e] transition-colors"
        aria-expanded={isUserMenuOpen}
        aria-label="Toggle user menu"
      >
        <Settings className="w-4 h-4 text-gray-500 hover:text-white" />
      </button>

      {/* Pop-up Menu */}
      {isUserMenuOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-40 bg-[#1e1f20] rounded-lg shadow-xl border border-white/10 overflow-hidden z-30">
          <button 
            onClick={handleSignOut} 
            className="flex items-center w-full px-4 py-3 text-sm text-red-400 hover:bg-[#2a2b2e] transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
    
  </div>
</div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 flex flex-col relative bg-[#131314]">
        {/* Toggle Sidebar Button (Mobile/Desktop) */}
        <div className="absolute top-4 left-4 z-10">
          
        </div>

        {/* CHAT CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center">
          
          {/* EMPTY STATE (The Dashboard Grid from Image) */}
          {messages.length === 0 ? (
            <div className="max-w-4xl w-full mt-20 animate-in fade-in zoom-in duration-500">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                  BRIDGESINGS
                </h1>
                <p className="text-gray-500 text-lg">How can I help you today?</p>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {/* Dynamic Suggestions */}
                {suggestions.map((item, idx) => (
                  <button key={idx} onClick={() => setInput(item.desc)} className="dashboard-card p-5 text-left group">
                    <div className="mb-3 p-2 rounded-lg bg-[#2a2b2e] w-fit group-hover:bg-[#35363a] transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-200 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-400">{item.desc}</p>
                  </button>
                ))}
                
                {/* Static Placeholders to fill grid like image */}
                
                
                
              </div>
            </div>
          ) : (
            // ACTIVE CHAT MESSAGES
            <div className="w-full max-w-3xl space-y-6 pb-24">
  {messages.map((msg, index) => {
    const isLastMessage = index === messages.length - 1 && msg.role === "model";

    return (
      <div
        key={index}
        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
      >
        <div
          className={`max-w-[80%] p-4 rounded-2xl leading-relaxed ${
            msg.role === "user" ? "bg-[#2a2b2e] text-white" : "text-gray-300"
          }`}
        >
          {/* Icon for Bot */}
          {msg.role === "model" && (
            <div className="w-6 h-6 mb-2 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
          )}

          {/* Typewriter effect only for last message from AI */}
          {msg.role === "model" ? (
            <TypewriterMessage text={msg.content} play={isLastMessage} />
          ) : (
            msg.content
          )}
        </div>
      </div>
    );
  })}

  {isLoading && (
    <div className="text-gray-500 text-sm ml-4 animate-pulse">AI is thinking...</div>
  )}

  <div ref={messagesEndRef} />
</div>

          )}
        </div>

        {/* INPUT AREA (Bottom Floating Bar) */}
        <div className="p-4 bg-gradient-to-t from-[#131314] via-[#131314] to-transparent z-10">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSend} className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Ai Chat..."
                className="w-full bg-[#1e1f20] text-gray-200 border border-white/10 rounded-full py-4 pl-6 pr-14 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all shadow-lg placeholder-gray-500"
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-2 p-2 bg-[#2a2b2e] hover:bg-white hover:text-black rounded-full text-gray-400 transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="text-center mt-2">
              <p className="text-[10px] text-gray-600">
                AI can make mistakes. Check important info.
              </p>
            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}