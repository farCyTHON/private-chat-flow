import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Onboarding from "./pages/Onboarding";
import ChatInbox from "./pages/ChatInbox";
import ChatView from "./pages/ChatView";
import Settings from "./pages/Settings";
import MediaHub from "./pages/MediaHub";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('whisperly-onboarded');
    setIsOnboarded(!!onboardingComplete);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem('whisperly-onboarded', 'true');
    setIsOnboarded(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            {!isOnboarded ? (
              <Onboarding onComplete={completeOnboarding} />
            ) : (
              <Routes>
                <Route path="/" element={<ChatInbox />} />
                <Route path="/chat/:id" element={<ChatView />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/media" element={<MediaHub />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            )}
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
