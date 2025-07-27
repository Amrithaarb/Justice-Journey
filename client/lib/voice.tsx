import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from './i18n';

export interface VoiceOptions {
  language?: string;
  continuous?: boolean;
  interimResults?: boolean;
}

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export function useSpeechRecognition(options: VoiceOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const recognition = useRef<SpeechRecognition | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = options.continuous ?? true;
      recognition.current.interimResults = options.interimResults ?? true;
      recognition.current.lang = options.language || getLanguageCode(language);
    }
  }, [language, options]);

  const startListening = useCallback(() => {
    if (!recognition.current || !isSupported) {
      setError(t('voice.notSupported'));
      return;
    }

    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setIsListening(true);

    recognition.current.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      setTranscript(prev => prev + finalTranscript);
      setInterimTranscript(interimTranscript);
    };

    recognition.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      
      switch (event.error) {
        case 'not-allowed':
          setError(t('voice.permissionDenied'));
          break;
        case 'network':
          setError(t('voice.networkError'));
          break;
        default:
          setError(t('voice.tryAgain'));
      }
    };

    recognition.current.onend = () => {
      setIsListening(false);
      setInterimTranscript('');
    };

    try {
      recognition.current.start();
    } catch (err) {
      setError(t('voice.tryAgain'));
      setIsListening(false);
    }
  }, [isSupported, t]);

  const stopListening = useCallback(() => {
    if (recognition.current && isListening) {
      recognition.current.stop();
    }
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  };
}

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const { language } = useLanguage();

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    
    if ('speechSynthesis' in window) {
      const updateVoices = () => {
        setVoices(speechSynthesis.getVoices());
      };
      
      updateVoices();
      speechSynthesis.onvoiceschanged = updateVoices;
      
      return () => {
        speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const speak = useCallback((text: string, options: SpeechOptions = {}) => {
    if (!isSupported || !text.trim()) return;

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Find appropriate voice for current language
    const langCode = getLanguageCode(language);
    const availableVoice = voices.find(voice => 
      voice.lang.startsWith(langCode) || voice.lang.startsWith(language)
    );
    
    if (availableVoice) {
      utterance.voice = availableVoice;
    }
    
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  }, [isSupported, language, voices]);

  const stop = useCallback(() => {
    if (isSupported) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported,
    voices
  };
}

function getLanguageCode(language: string): string {
  const languageCodes: Record<string, string> = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'te': 'te-IN',
    'ta': 'ta-IN',
    'bn': 'bn-IN',
    'mr': 'mr-IN',
    'gu': 'gu-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN',
    'or': 'or-IN',
    'pa': 'pa-IN',
    'ur': 'ur-IN'
  };
  
  return languageCodes[language] || 'en-US';
}

// Voice-enabled textarea component
export function VoiceTextarea({
  value,
  onChange,
  placeholder,
  className = '',
  ...props
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}) {
  const { t } = useLanguage();
  const { speak, stop, isSpeaking } = useSpeechSynthesis();
  const {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported: speechSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      // Create a synthetic event object that matches textarea onChange signature
      const syntheticEvent = {
        target: { value: value + transcript },
        currentTarget: { value: value + transcript }
      } as React.ChangeEvent<HTMLTextAreaElement>;
      onChange(syntheticEvent);
      resetTranscript();
    }
  }, [transcript, resetTranscript, value, onChange]);

  const handleVoiceInput = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else if (value.trim()) {
      speak(value);
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value + interimTranscript}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${className} ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      
      {speechSupported && (
        <div className="absolute bottom-2 right-2 flex space-x-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded-full text-white transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-justice-primary hover:bg-justice-primary/90'
            }`}
            title={isListening ? t('voice.stopListening') : t('voice.startListening')}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4V10C14 11.1 13.1 12 12 12C10.9 12 10 11.1 10 10V4C10 2.9 10.9 2 12 2M19 10V12C19 15.3 16.3 18 13 18V20H11V18C7.7 18 5 15.3 5 12V10H7V12C7 14.2 8.8 16 11 16H13C15.2 16 17 14.2 17 12V10H19Z" />
            </svg>
          </button>
          
          {value && (
            <button
              type="button"
              onClick={handleSpeak}
              className={`p-2 rounded-full text-white transition-colors ${
                isSpeaking 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              title={isSpeaking ? t('voice.stopSpeaking') : t('voice.speak')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                {isSpeaking ? (
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                ) : (
                  <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.85 14,18.71V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                )}
              </svg>
            </button>
          )}
        </div>
      )}
      
      {error && (
        <div className="absolute -bottom-6 left-0 text-xs text-red-500">
          {error}
        </div>
      )}
      
      {isListening && (
        <div className="absolute -top-6 left-0 text-xs text-blue-500 flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          {t('voice.listening')}
        </div>
      )}
    </div>
  );
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}
