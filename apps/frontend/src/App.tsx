import { useState } from "react";
import {
  Bot,
  Send,
  ThumbsDown,
  ThumbsUp,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  type: "user" | "bot";
  image?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "user",
      content:
        "Describe and show me the perfect vacation spot on an island in the ocean",
    },
    {
      id: "2",
      type: "bot",
      content:
        "Imagine yourself on an idyllic island in the middle of the vast ocean, where turquoise waters and powdery white sand surround you. This perfect vacation spot is a tropical paradise that offers a blend of tranquility and adventure.",
      image:
        "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=2073&auto=format&fit=crop",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: input,
        type: "user",
      },
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Card className="w-full max-w-md h-screen mx-auto bg-[#111111] border-none shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
          <Button variant="ghost" size="icon" className="hover:bg-zinc-800">
            <Bot className="h-6 w-6 text-white" />
          </Button>
          <div>
            <h2 className="font-semibold text-accent">Optfai</h2>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${message.type === "user" ? "bg-white text-black" : "bg-zinc-800 text-white"} rounded-2xl p-4`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="AI Generated"
                      className="mt-2 rounded-lg w-full h-48 object-cover grayscale"
                    />
                  )}
                  {message.type === "bot" && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-zinc-700"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-zinc-700"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-zinc-700"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-zinc-800">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="bg-zinc-900 border-zinc-800 focus-visible:ring-white"
            />

            <Button
              size="icon"
              onClick={handleSend}
              className="bg-white hover:bg-zinc-200 text-black"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default App;
