import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import AITypingIndicator from "./AITypingIndicator";

interface Message {
  role: "assistant" | "user";
  content: string;
  timestamp: number;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const initialMessage: Message = {
        role: "assistant",
        content: "Hello! I'm ready to help you with your code. What would you like to work on?",
        timestamp: Date.now()
      };
      setMessages([initialMessage]);
      localStorage.setItem("chatHistory", JSON.stringify([initialMessage]));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        role: "assistant",
        content: "I understand your request. Let me help you with that.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsThinking(false);
    }, 1500);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem("chatHistory");
    toast({
      title: "Chat history cleared",
      description: "All messages have been removed.",
    });
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-background border rounded-lg shadow-lg">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="text-sm font-medium">Chat History</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="h-8 px-2 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-muted text-foreground mr-12"
              }`}
            >
              <div className="text-sm">{message.content}</div>
              <div className="text-xs opacity-50 mt-1">
                {formatTimestamp(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="max-w-[80%] mr-12">
              <AITypingIndicator />
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button type="submit" disabled={isThinking}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;