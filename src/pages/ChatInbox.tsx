import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Settings, 
  Plus, 
  Star, 
  Archive, 
  Users, 
  Shield,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMessage: "The project files are ready for review 🎉",
    timestamp: "2m",
    unread: 2,
    avatar: "SC",
    isOnline: true,
    isEncrypted: true,
    isPinned: true,
    type: "direct"
  },
  {
    id: "2", 
    name: "Design Team",
    lastMessage: "Alex: New mockups uploaded to Figma",
    timestamp: "15m",
    unread: 0,
    avatar: "DT",
    isOnline: false,
    isEncrypted: true,
    isPinned: false,
    type: "group",
    memberCount: 5
  },
  {
    id: "3",
    name: "Mom",
    lastMessage: "Don't forget dinner this Sunday!",
    timestamp: "1h",
    unread: 1,
    avatar: "M",
    isOnline: true,
    isEncrypted: true,
    isPinned: true,
    type: "direct"
  },
  {
    id: "4",
    name: "Product Updates",
    lastMessage: "Weekly sprint summary is available",
    timestamp: "3h",
    unread: 0,
    avatar: "PU",
    isOnline: false,
    isEncrypted: true,
    isPinned: false,
    type: "group",
    memberCount: 12
  },
  {
    id: "5",
    name: "Jake Miller",
    lastMessage: "Thanks for the help with the code review!",
    timestamp: "1d",
    unread: 0,
    avatar: "JM",
    isOnline: false,
    isEncrypted: true,
    isPinned: false,
    type: "direct"
  }
];

const ChatInbox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (activeFilter) {
      case "unread":
        return matchesSearch && conv.unread > 0;
      case "pinned":
        return matchesSearch && conv.isPinned;
      case "groups":
        return matchesSearch && conv.type === "group";
      default:
        return matchesSearch;
    }
  });

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Whisperly
            </h1>
            <div className="flex items-center space-x-1 text-xs">
              <Shield className="h-3 w-3 text-privacy-encrypted" />
              <span className="encrypted-indicator">Encrypted</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              className="hover:bg-muted/50"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted/50"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 chat-input"
            />
          </div>
        </div>

        {/* AI Priority Section */}
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">AI Prioritized</span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {["all", "unread", "pinned", "groups"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="whitespace-nowrap rounded-full text-xs"
              >
                {filter === "all" && "All"}
                {filter === "unread" && "Unread"}
                {filter === "pinned" && "Pinned"}
                {filter === "groups" && "Groups"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto chat-container">
        {filteredConversations.map((conversation, index) => (
          <div
            key={conversation.id}
            onClick={() => handleChatClick(conversation.id)}
            className="p-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-all duration-200 hover:scale-[1.01] animate-message-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-medium">
                    {conversation.avatar}
                  </AvatarFallback>
                </Avatar>
                {conversation.type === "group" && (
                  <Users className="absolute -bottom-1 -right-1 h-4 w-4 text-accent bg-background rounded-full p-0.5" />
                )}
                {conversation.isOnline && conversation.type === "direct" && (
                  <div className="absolute -bottom-1 -right-1 status-indicator status-online"></div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground truncate">
                      {conversation.name}
                    </h3>
                    {conversation.isPinned && (
                      <Star className="h-3 w-3 text-accent fill-current" />
                    )}
                    {conversation.isEncrypted && (
                      <Shield className="h-3 w-3 text-privacy-encrypted" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {conversation.timestamp}
                    </span>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {conversation.lastMessage}
                  </p>
                  {conversation.type === "group" && (
                    <span className="text-xs text-muted-foreground">
                      {conversation.memberCount} members
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="flex justify-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/media")}
            className="flex items-center space-x-2"
          >
            <Archive className="h-4 w-4" />
            <span>Media</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;