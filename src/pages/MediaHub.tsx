import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  Image, 
  Video, 
  FileText, 
  Download,
  Share,
  Trash2,
  Calendar,
  User
} from "lucide-react";

// Mock data for media files
const mediaFiles = [
  {
    id: "1",
    name: "design-mockups.pdf",
    type: "document",
    size: "2.4 MB",
    date: "2024-01-15",
    sender: "Sarah Chen",
    thumbnail: null,
    chatId: "1"
  },
  {
    id: "2",
    name: "team-photo.jpg", 
    type: "image",
    size: "1.8 MB",
    date: "2024-01-14",
    sender: "Design Team",
    thumbnail: "🖼️",
    chatId: "2"
  },
  {
    id: "3",
    name: "project-demo.mp4",
    type: "video", 
    size: "12.5 MB",
    date: "2024-01-13",
    sender: "Jake Miller",
    thumbnail: "🎥",
    chatId: "5"
  },
  {
    id: "4",
    name: "meeting-notes.docx",
    type: "document",
    size: "156 KB", 
    date: "2024-01-12",
    sender: "Product Updates",
    thumbnail: null,
    chatId: "4"
  },
  {
    id: "5",
    name: "vacation-pics.jpg",
    type: "image",
    size: "3.2 MB",
    date: "2024-01-10",
    sender: "Mom", 
    thumbnail: "🏖️",
    chatId: "3"
  },
  {
    id: "6",
    name: "code-review.zip",
    type: "document",
    size: "4.7 MB", 
    date: "2024-01-09",
    sender: "Sarah Chen",
    thumbnail: null,
    chatId: "1"
  }
];

const MediaHub = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return Image;
      case "video":
        return Video;
      case "document":
        return FileText;
      default:
        return FileText;
    }
  };

  const getFileTypeColor = (type: string) => {
    switch (type) {
      case "image":
        return "text-green-400";
      case "video": 
        return "text-blue-400";
      case "document":
        return "text-orange-400";
      default:
        return "text-muted-foreground";
    }
  };

  const filteredFiles = mediaFiles
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           file.sender.toLowerCase().includes(searchQuery.toLowerCase());
      
      switch (activeFilter) {
        case "images":
          return matchesSearch && file.type === "image";
        case "videos":
          return matchesSearch && file.type === "video";
        case "documents":
          return matchesSearch && file.type === "document";
        default:
          return matchesSearch;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "size":
          return parseFloat(b.size) - parseFloat(a.size);
        case "date":
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="h-screen bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Media Hub</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search files and media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 chat-input"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {["all", "images", "videos", "documents"].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="whitespace-nowrap rounded-full text-xs"
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            {["date", "name", "size"].map((sort) => (
              <Button
                key={sort}
                variant="ghost"
                size="sm"
                onClick={() => setSortBy(sort)}
                className={`text-xs ${sortBy === sort ? "text-primary" : "text-muted-foreground"}`}
              >
                {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-primary">
            {mediaFiles.filter(f => f.type === "image").length}
          </div>
          <div className="text-xs text-muted-foreground">Images</div>
        </div>
        <div className="glass-card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-accent">
            {mediaFiles.filter(f => f.type === "video").length}
          </div>
          <div className="text-xs text-muted-foreground">Videos</div>
        </div>
        <div className="glass-card rounded-2xl p-3 text-center">
          <div className="text-2xl font-bold text-orange-400">
            {mediaFiles.filter(f => f.type === "document").length}
          </div>
          <div className="text-xs text-muted-foreground">Documents</div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="p-4 space-y-3">
        {filteredFiles.map((file, index) => {
          const FileIcon = getFileIcon(file.type);
          return (
            <div
              key={file.id}
              className="glass-card rounded-2xl p-4 hover:bg-muted/10 transition-all duration-200 animate-message-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center space-x-3">
                {/* File Preview/Icon */}
                <div className="flex-shrink-0">
                  {file.thumbnail ? (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
                      {file.thumbnail}
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted/30 flex items-center justify-center">
                      <FileIcon className={`h-6 w-6 ${getFileTypeColor(file.type)}`} />
                    </div>
                  )}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">
                    {file.name}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {file.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {file.size}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{file.sender}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(file.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No files found</h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filter settings
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaHub;