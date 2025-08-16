import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Shield, 
  Smartphone, 
  Key, 
  Download, 
  Trash2,
  Bell,
  Moon,
  Globe,
  HelpCircle,
  LogOut,
  Plus,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const devices = [
    {
      id: "1",
      name: "iPhone 15 Pro",
      type: "iOS",
      lastActive: "Active now",
      isCurrentDevice: true,
      verified: true
    },
    {
      id: "2", 
      name: "MacBook Pro",
      type: "Desktop",
      lastActive: "2 hours ago",
      isCurrentDevice: false,
      verified: true
    },
    {
      id: "3",
      name: "Chrome Browser",
      type: "Web",
      lastActive: "1 week ago", 
      isCurrentDevice: false,
      verified: false
    }
  ];

  return (
    <div className="h-screen bg-background overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="hover:bg-muted/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-2xl mx-auto">
        {/* Privacy & Security */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-privacy-verified" />
            <h2 className="text-lg font-semibold">Privacy & Security</h2>
          </div>
          
          <div className="glass-card rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">End-to-End Encryption</h3>
                <p className="text-sm text-muted-foreground">All messages are encrypted by default</p>
              </div>
              <Badge variant="secondary" className="bg-privacy-encrypted/20 text-privacy-encrypted">
                Enabled
              </Badge>  
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Read Receipts</h3>
                <p className="text-sm text-muted-foreground">Let others know when you've read their messages</p>
              </div>
              <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Online Status</h3>
                <p className="text-sm text-muted-foreground">Show when you're active</p>
              </div>
              <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
            </div>

            <Separator />

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start space-x-2">
                <Key className="h-4 w-4" />
                <span>Export Encryption Keys</span>
              </Button>
              
              <Button variant="outline" className="w-full justify-start space-x-2">
                <Download className="h-4 w-4" />
                <span>Backup Chat History</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Device Management */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-semibold">Connected Devices</h2>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Device
            </Button>
          </div>

          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="glass-card rounded-2xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted/30">
                      <Smartphone className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{device.name}</h3>
                        {device.isCurrentDevice && (
                          <Badge variant="secondary" className="text-xs">This device</Badge>
                        )}
                        {device.verified ? (
                          <CheckCircle className="h-4 w-4 text-privacy-verified" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-privacy-unencrypted" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {device.type} • {device.lastActive}
                      </p>
                    </div>
                  </div>
                  
                  {!device.isCurrentDevice && (
                    <Button
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          
          <div className="glass-card rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive notifications for new messages</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <Button variant="outline" className="w-full justify-start">
              Customize notification settings
            </Button>
          </div>
        </section>

        {/* General */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">General</h2>
          
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 h-12"
            >
              <Moon className="h-4 w-4" />
              <span>Appearance</span>
            </Button>
            
            <Button
              variant="ghost" 
              className="w-full justify-start space-x-3 h-12"
            >
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 h-12"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Help & Support</span>
            </Button>
          </div>
        </section>

        {/* Account */}
        <section className="space-y-4 pb-8">
          <h2 className="text-lg font-semibold text-destructive">Account</h2>
          
          <Button
            variant="ghost"
            className="w-full justify-start space-x-3 h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </section>

        {/* Footer */}
        <div className="text-center py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Whisperly v1.0.0 • Privacy-first messaging
          </p>
          <div className="flex items-center justify-center space-x-1 mt-1 text-xs">
            <Shield className="h-3 w-3 text-privacy-encrypted" />
            <span className="encrypted-indicator">All data encrypted locally</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;