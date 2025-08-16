import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  Shield,
  Check,
  CheckCheck,
  Reply,
  Heart,
  ThumbsUp,
  Laugh
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for chat
const chatData = {
  "1": {
    name: "Sarah Chen",
    avatar: "SC",
    isOnline: true,
    lastSeen: "Active now",
    isEncrypted: true
  }
};

const messages = [
  {
    id: "1",
    content: "Hey! How's the project coming along?",
    timestamp: "10:30 AM",
    sender: "Sarah Chen",
    isSent: false,
    status: "delivered",
    reactions: [],
    replyTo: null
  },
  {
    id: "2", 
    content: "Going really well! Just finished the design system implementation 🎨",
    timestamp: "10:32 AM",
    sender: "You",
    isSent: true,
    status: "read",
    reactions: [{ emoji: "👍", users: ["Sarah Chen"] }],
    replyTo: null
  },
  {
    id: "3",
    content: "That's awesome! Can't wait to see it",
    timestamp: "10:33 AM", 
    sender: "Sarah Chen",
    isSent: false,
    status: "delivered",
    reactions: [],
    replyTo: "2"
  },
  {
    id: "4",
    content: "The project files are ready for review 🎉",
    timestamp: "10:45 AM",
    sender: "Sarah Chen", 
    isSent: false,
    status: "delivered",
    reactions: [],
    replyTo: null
  }
];

const ChatView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const chat = chatData[id as keyof typeof chatData];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Optimistic UI - show message immediately
    toast({
      title: "Message sent",
      description: "End-to-end encrypted",
      duration: 2000,
    });
    
    setMessage("");
    setIsTyping(false);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    toast({
      title: "Reaction added",
      description: `${emoji} sent`,
      duration: 1500,
    });
  };

  const quickReplies = ["👍", "Thanks!", "Sounds good", "On it!"];

  if (!chat) {
    return <div>Chat not found</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-medium">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute -bottom-1 -right-1 status-indicator status-online"></div>
              )}
            </div>
            
            <div>
              <h2 className="font-semibold text-foreground">{chat.name}</h2>
              <div className="flex items-center space-x-2 text-xs">
                <span className="text-muted-foreground">{chat.lastSeen}</span>
                {chat.isEncrypted && (
                  <>
                    <Shield className="h-3 w-3 text-privacy-encrypted" />
                    <span className="encrypted-indicator">Encrypted</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-muted/50">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto chat-container p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex ${msg.isSent ? "justify-end" : "justify-start"} animate-message-in`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`max-w-[80%] space-y-1`}>
              {msg.replyTo && (
                <div className="text-xs text-muted-foreground pl-4 border-l-2 border-muted">
                  Replying to: {messages.find(m => m.id === msg.replyTo)?.content.substring(0, 50)}...
                </div>
              )}
              
              <div
                className={`message-bubble group relative hover:scale-message ${
                  msg.isSent ? "message-sent" : "message-received"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                
                {/* Message Actions */}
                <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 bg-background/80 hover:bg-background"
                    onClick={() => handleReaction(msg.id, "👍")}
                  >
                    <ThumbsUp className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 bg-background/80 hover:bg-background"
                  >
                    <Reply className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Reactions */}
              {msg.reactions.length > 0 && (
                <div className="flex space-x-1 ml-2">
                  {msg.reactions.map((reaction, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-xs px-2 py-0 h-6 bg-muted/50 hover:bg-muted cursor-pointer animate-bubble-pop"
                    >
                      {reaction.emoji} {reaction.users.length}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Timestamp and Status */}
              <div className={`flex items-center space-x-1 text-xs text-muted-foreground ${
                msg.isSent ? "justify-end" : "justify-start"
              }`}>
                <span>{msg.timestamp}</span>
                {msg.isSent && (
                  <div className="flex items-center">
                    {msg.status === "read" ? (
                      <CheckCheck className="h-3 w-3 text-primary" />
                    ) : (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="message-bubble message-received animate-bubble-pop">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-typing" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {quickReplies.length > 0 && (
        <div className="px-4 py-2 border-t border-border/50">
          <div className="flex space-x-2 overflow-x-auto">
            {quickReplies.map((reply, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                onClick={() => setMessage(reply)}
                className="whitespace-nowrap rounded-full text-xs bg-muted/30 hover:bg-muted/50"
              >
                {reply}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-border bg-card/30 backdrop-blur-sm p-4">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="chat-input pr-20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {message.trim() ? (
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full hover:bg-muted/50"
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Encryption Notice */}
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground flex items-center justify-center space-x-1">
            <Shield className="h-3 w-3 text-privacy-encrypted" />
            <span>Messages are end-to-end encrypted</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatView;