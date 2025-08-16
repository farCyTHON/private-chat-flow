import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Zap, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/whisperly-hero.jpg";

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Shield,
      title: "Privacy First",
      subtitle: "Your conversations, truly private",
      description: "End-to-end encryption ensures only you and your contacts can read your messages. No backdoors, no compromises.",
      visual: "🔐"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      subtitle: "Instant messaging, intelligent sorting",
      description: "AI prioritizes your important conversations while keeping everything synced across devices in real-time.",
      visual: "⚡"
    },
    {
      icon: Users,
      title: "Rich Conversations",
      subtitle: "More than just text",
      description: "React, reply in threads, share media, and express yourself with a rich set of communication tools.",
      visual: "💬"
    },
    {
      icon: CheckCircle,
      title: "Ready to Chat",
      subtitle: "Let's get you started",
      description: "Welcome to Whisperly! Your secure, intelligent chat experience begins now.",
      visual: "🚀"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-card relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 36, 50, 0.85), rgba(34, 36, 50, 0.85)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="w-full max-w-md">
        {/* Progress Indicators */}
        <div className="flex justify-center mb-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index <= currentStep 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-3xl p-8 text-center animate-scale-in">
          {/* Visual */}
          <div className="text-6xl mb-6 animate-bubble-pop">
            {currentStepData.visual}
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold mb-2 text-foreground">
            {currentStepData.title}
          </h1>
          <p className="text-lg text-primary font-medium mb-4">
            {currentStepData.subtitle}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            {currentStepData.description}
          </p>

          {/* Navigation */}  
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="opacity-50 hover:opacity-100 disabled:opacity-20"
            >
              Previous
            </Button>

            <Button
              onClick={handleNext}
              className="px-8 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-medium transition-all duration-200 hover:scale-105"
            >
              {currentStep === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>🔒 All data is encrypted locally before transmission</p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;