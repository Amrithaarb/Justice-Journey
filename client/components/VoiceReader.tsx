import { Button } from "./ui/button";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { useSpeechSynthesis } from "../lib/voice";
import { useLanguage } from "../lib/i18n";

interface VoiceReaderProps {
  text: string;
  className?: string;
  variant?: "default" | "icon-only" | "compact";
  autoRead?: boolean;
}

export function VoiceReader({
  text,
  className = "",
  variant = "default",
  autoRead = false,
}: VoiceReaderProps) {
  const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
  const { t } = useLanguage();

  if (!isSupported) {
    return null; // Don't show voice controls if not supported
  }

  const handleToggleReading = () => {
    if (isSpeaking) {
      stop();
    } else {
      // Clean up text for better speech (remove HTML tags, extra spaces)
      const cleanText = text
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();

      if (cleanText) {
        speak(cleanText, { rate: 0.9 }); // Slightly slower for better comprehension
      }
    }
  };

  if (variant === "icon-only") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggleReading}
        className={`p-2 ${className}`}
        title={isSpeaking ? t("voice.stopSpeaking") : t("voice.speak")}
      >
        {isSpeaking ? (
          <VolumeX className="h-4 w-4 text-red-500" />
        ) : (
          <Volume2 className="h-4 w-4 text-gray-600" />
        )}
      </Button>
    );
  }

  if (variant === "compact") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggleReading}
        className={`flex items-center space-x-2 ${className}`}
      >
        {isSpeaking ? (
          <>
            <Pause className="h-4 w-4" />
            <span className="text-xs">{t("voice.stopSpeaking")}</span>
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            <span className="text-xs">{t("voice.speak")}</span>
          </>
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isSpeaking ? "destructive" : "outline"}
      size="sm"
      onClick={handleToggleReading}
      className={`flex items-center space-x-2 ${className}`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="h-4 w-4" />
          <span>{t("voice.stopSpeaking")}</span>
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4" />
          <span>{t("voice.speak")}</span>
        </>
      )}
    </Button>
  );
}

// Component for reading page content automatically
export function PageVoiceReader({ children }: { children: React.ReactNode }) {
  const { isSupported } = useSpeechSynthesis();

  if (!isSupported) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      <div className="fixed bottom-20 right-6 z-40">
        <VoiceReader
          text={typeof children === "string" ? children : ""}
          variant="icon-only"
          className="bg-white shadow-lg border border-gray-200 rounded-full w-12 h-12 hover:bg-gray-50"
        />
      </div>
    </div>
  );
}
