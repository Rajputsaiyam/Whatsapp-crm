// import { useState } from "react";
// import { Send } from "lucide-react";
// import StatusBadge from "@/components/shared/StatusBadge";
// import api from "@/services/api";

// interface Message {
//   role: "user" | "assistant" | "escalation";
//   content: string;  
//   timestamp: string;
// }

// const Chatbot = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sessionId] = useState(() => Math.random().toString(36).slice(2));

//   // const sendMessage = async () => {
//   //   if (!input.trim() || loading) return;
//   //   const userMsg: Message = { role: "user", content: input, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
//   //   setMessages((p) => [...p, userMsg]);
//   //   setInput("");
//   //   setLoading(true);

//   //   try {
//   //     const res = await api.post("/chatbot/chat", { message: input, sessionId });
//   //     const botMsg: Message = { role: "assistant", content: res.data.reply, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
//   //     setMessages((p) => [...p, botMsg]);
//   //     if (res.data.escalated) {
//   //       setMessages((p) => [...p, { role: "escalation", content: "Connecting you to a human agent...", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
//   //     }
//   //   } catch {
//   //     setMessages((p) => [...p, { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again.", timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const sendMessage = async () => {
//   if (!input.trim() || loading) return;

//   const userMsg: Message = {
//     role: "user",
//     content: input,
//     timestamp: new Date().toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     }),
//   };

//   setMessages((p) => [...p, userMsg]);
//   setInput("");
//   setLoading(true);

//   try {
//     // ✅ FIXED API CALL
//     const res = await api.post("/api/chat", {
//       message: input,
//     });

//     const reply = res.data.reply;

//     const botMsg: Message = {
//       role: "assistant",
//       content: reply,
//       timestamp: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };

//     setMessages((p) => [...p, botMsg]);

//     // ✅ ESCALATION LOGIC
//     if (
//       input.toLowerCase().includes("human") ||
//       input.toLowerCase().includes("agent") ||
//       input.toLowerCase().includes("support")
//     ) {
//       setMessages((p) => [
//         ...p,
//         {
//           role: "escalation",
//           content: "Connecting you to a human agent...",
//           timestamp: new Date().toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//     }
//   } catch (err: any) {
//     console.error("CHAT ERROR:", err.response?.data || err.message);

//     setMessages((p) => [
//       ...p,
//       {
//         role: "assistant",
//         content: "AI is currently unavailable. Please try again.",
//         timestamp: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       },
//     ]);
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="flex gap-6 h-[calc(100vh-56px-48px)]">
//       {/* Left Config Panel */}
//       <div className="w-[30%] bg-card rounded-xl border border-crm-border p-6">
//         <h2 className="text-lg font-semibold text-foreground mb-2">AI Chatbot</h2>
//         <p className="text-sm text-muted-foreground mb-6">Test your AI chatbot below</p>
//         <div className="space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-foreground">Knowledge base:</span>
//             <StatusBadge status="Active" />
//           </div>
//           <div className="flex items-center gap-2">
//             <span className="text-sm text-foreground">Escalation:</span>
//             <span className="badge-info inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">Enabled</span>
//           </div>
//         </div>
//       </div>

//       {/* Chat Interface */}
//       <div className="flex-1 bg-card rounded-xl border border-crm-border flex flex-col overflow-hidden">
//         {/* Top bar */}
//         <div className="flex items-center gap-3 px-4 py-3 border-b border-crm-border">
//           <div className="w-8 h-8 rounded-full bg-crm-blue flex items-center justify-center text-primary-foreground text-xs font-bold">AI</div>
//           <div>
//             <div className="font-semibold text-sm text-foreground">AI Assistant</div>
//             <div className="flex items-center gap-1">
//               <div className="w-2 h-2 rounded-full bg-crm-green" />
//               <span className="text-xs text-muted-foreground">Online</span>
//             </div>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
//           {messages.length === 0 && (
//             <div className="text-center text-muted-foreground text-sm mt-16">Start a conversation with the AI chatbot</div>
//           )}
//           {messages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//               {msg.role === "escalation" ? (
//                 <div className="badge-warning rounded-lg px-4 py-3 text-sm max-w-[70%]">{msg.content}</div>
//               ) : (
//                 <div>
//                   <div
//                     className={`px-3.5 py-2.5 text-sm max-w-[70%] ${
//                       msg.role === "user"
//                         ? "bg-crm-blue text-primary-foreground rounded-xl rounded-br-sm"
//                         : "bg-muted text-foreground rounded-xl rounded-bl-sm"
//                     }`}
//                   >
//                     {msg.content}
//                   </div>
//                   <div className={`text-[11px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : ""}`}>{msg.timestamp}</div>
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div className="flex justify-start">
//               <div className="bg-muted rounded-xl rounded-bl-sm px-4 py-3">
//                 <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="border-t border-crm-border p-3 flex items-center gap-3">
//           <input
//             className="flex-1 border border-crm-border rounded-lg px-4 py-2.5 text-sm"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           />
//           <button onClick={sendMessage} className="w-9 h-9 rounded-full bg-crm-blue flex items-center justify-center hover:bg-crm-blue-dark transition-colors">
//             <Send size={16} className="text-primary-foreground" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




import { useState } from "react";
import { Send } from "lucide-react";
import api from "@/services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ SEND MESSAGE FUNCTION
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userText = input;

    const userMsg: Message = {
      role: "user",
      content: userText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await api.post("/api/chat", {
        message: userText,
      });

      const botMsg: Message = {
        role: "assistant",
        content: res.data.reply || "No response",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error("CHAT ERROR:", err.response?.data || err.message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error connecting to AI. Please try again.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border border-crm-border rounded-xl overflow-hidden bg-white">

      {/* HEADER */}
      <div className="p-4 border-b font-semibold text-lg">
        AI Chatbot
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="text-gray-400 text-sm">
            Start conversation...
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-[70%] ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-black"
              }`}
            >
              <div>{msg.content}</div>
              <div className="text-[10px] mt-1 opacity-70">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-sm text-gray-500">Typing...</div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t flex items-center gap-2">
        <input
          className="flex-1 border border-crm-border rounded-lg px-4 py-2 text-sm outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
        >
          <Send size={16} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;