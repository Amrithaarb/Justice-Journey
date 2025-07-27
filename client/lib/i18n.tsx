import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Language =
  | "en"
  | "hi"
  | "te"
  | "ta"
  | "bn"
  | "mr"
  | "gu"
  | "kn"
  | "ml"
  | "or"
  | "pa"
  | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.awareness": "Awareness Hub",
    "nav.scenarios": "Scenario Simulation",
    "nav.results": "Results",
    "nav.getStarted": "Get Started",
    "nav.language": "Language",

    // Homepage
    "home.title": "Know Your Legal Rights",
    "home.subtitle":
      "Justice Journey empowers youth and communities with interactive legal education. Learn about your rights, understand consequences, and navigate legal situations with confidence through engaging scenarios and expert guidance.",
    "home.startJourney": "Start Your Journey",
    "home.exploreResources": "Explore Resources",
    "home.interactiveLearning": "Interactive Learning",
    "home.chooseYourPath": "Choose your path, learn from outcomes",
    "home.realWorldScenarios": "Real-world legal scenarios",
    "home.expertExplanations": "Expert legal explanations",
    "home.trackProgress": "Track your progress",
    "home.empowerTitle": "Empower Yourself with Legal Knowledge",
    "home.empowerSubtitle":
      "From understanding your rights during police interactions to learning about cyberbullying laws, we make legal education accessible and engaging.",
    "home.scenarioSimulation": "Scenario Simulation",
    "home.scenarioDesc":
      "Step into real-world situations and see how your choices affect legal outcomes. Learn through interactive decision-making.",
    "home.awarenessHub": "Awareness Hub",
    "home.awarenessDesc":
      "Access simplified legal articles, myth-busting content, and essential information about your rights and responsibilities.",
    "home.trackProgressTitle": "Track Progress",
    "home.trackProgressDesc":
      "Monitor your learning journey, review past decisions, and build your legal knowledge systematically.",
    "home.missionTitle": "Our Mission: Justice for All",
    "home.missionDesc":
      "We believe that everyone deserves to understand their legal rights and the consequences of their actions. Justice Journey makes legal education accessible, especially for youth and underserved communities who need it most.",
    "home.communityFocused": "Community Focused",
    "home.communityDesc":
      "Designed specifically for youth and underserved communities",
    "home.educationalExcellence": "Educational Excellence",
    "home.educationalDesc":
      "Expert-reviewed content in simple, understandable language",
    "home.rightsProtection": "Rights Protection",
    "home.rightsDesc":
      "Empowering people to know and exercise their legal rights",
    "home.quote":
      "Knowledge of the law is essential for justice. When people understand their rights, they can better protect themselves and their communities.",
    "home.ctaTitle": "Ready to Start Your Legal Education Journey?",
    "home.ctaSubtitle":
      "Join thousands of learners who are building their legal knowledge and protecting their rights through Justice Journey.",
    "home.exploreScenarios": "Explore Scenarios",
    "home.learnRights": "Learn Your Rights",

    // Voice Features
    "voice.startListening": "Start Voice Input",
    "voice.stopListening": "Stop Listening",
    "voice.listening": "Listening...",
    "voice.speak": "Read Aloud",
    "voice.stopSpeaking": "Stop Reading",
    "voice.notSupported": "Voice features not supported in this browser",
    "voice.permissionDenied": "Microphone permission denied",
    "voice.networkError": "Network error occurred",
    "voice.tryAgain": "Please try again",

    // Chatbot
    "chat.assistant": "Legal Assistant",
    "chat.placeholder": 'Ask me anything or say "take me to scenarios"...',
    "chat.disclaimer":
      'Try: "Take me to Legal Analyzer" or ask legal questions • For specific advice, consult a lawyer',
    "chat.quickNav": "Quick Navigation:",
    "chat.currentPage": "Currently on:",
    "chat.analyzer": "Analyzer",
    "chat.scenarios": "Scenarios",
    "chat.results": "Results",

    // Awareness Hub
    "awareness.title": "Constitutional AI Legal Analyzer",
    "awareness.subtitle":
      "Advanced AI trained on complete Indian Constitutional law, IPC, CrPC, and legal precedents. Get comprehensive legal analysis with constitutional rights, court procedures, and expert guidance.",
    "awareness.analyzer.title": "AI Legal Scenario Analyzer",
    "awareness.analyzer.description":
      "Comprehensive legal analysis according to Indian Constitution, applicable acts, and legal procedures.",
    "awareness.analyzer.inputLabel":
      "Describe your legal situation or planned action:",
    "awareness.analyzer.analyze": "Get Instant Legal Analysis",
    "awareness.analyzer.analyzing": "Analyzing Your Legal Situation...",
    "awareness.tabs.analyzer": "Legal Analyzer",
    "awareness.tabs.articles": "Articles",
    "awareness.tabs.rights": "Rights",
    "awareness.tabs.cases": "Cases",
    "awareness.tabs.quiz": "Quiz",
    "awareness.tabs.help": "Help",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error occurred",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.continue": "Continue",
    "common.back": "Back",
    "common.next": "Next",
    "common.submit": "Submit",
    "common.close": "Close",
  },

  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.awareness": "जागरूकता केंद्र",
    "nav.scenarios": "परिस्थिति सिमुलेशन",
    "nav.results": "परिणाम",
    "nav.getStarted": "शुरू करें",
    "nav.language": "भाषा",

    // Homepage
    "home.title": "अपने कानूनी अधिकार जानें",
    "home.subtitle":
      "जस्टिस जर्नी युवाओं और समुदायों को इंटरैक्टिव कानूनी शिक्षा के साथ सशक्त बनाता है। अपने अधिकारों के बारे में जानें, परिणामों को समझें, और आकर्षक परिदृश्यों और विशेषज्ञ मार्गदर्शन के माध्य��� से कानूनी स्थितियों को आत्मविश्वास के साथ नेविगेट करें।",
    "home.startJourney": "अपनी यात्रा शुरू करें",
    "home.exploreResources": "संसाधन देखें",
    "home.interactiveLearning": "इंटरैक्टिव सीखना",
    "home.chooseYourPath": "अपना रास्ता चुनें, परिणामों से सीखें",
    "home.realWorldScenarios": "वास्तविक जीवन के कानूनी परिदृश्य",
    "home.expertExplanations": "विशेषज्ञ कानूनी व्याख्याएं",
    "home.trackProgress": "अपनी प्रगति ट्रैक करें",
    "home.empowerTitle": "कानूनी ज्ञान के साथ खुद को सशक्त बनाएं",
    "home.empowerSubtitle":
      "पुलिस के साथ बातचीत के दौरान अपने अधिकारों को समझने से लेकर साइबर बुलिंग कानूनों के बारे में सीखने तक, हम कानूनी शिक्षा को सुलभ और ���कर्षक बनाते हैं।",
    "home.scenarioSimulation": "परिस्थिति सिमुलेशन",
    "home.scenarioDesc":
      "वास्तविक जीवन की स्थितियों में कदम रखें और देखें कि आपके विकल्प कानूनी परिण��मों को कैसे प्रभावित करते हैं। इंटरैक्टिव निर्णय लेने के माध्यम से सीखें।",
    "home.awarenessHub": "जागरूकता केंद्र",
    "home.awarenessDesc":
      "सरल कानूनी लेख, मिथक-बस्टिंग सामग्री, और आपके अधिकारों और जिम्मेदारियों के बारे में आवश्यक जानकारी तक पहुंच।",
    "home.trackProgressTitle": "प्रगति ट्रैक करें",
    "home.trackProgressDesc":
      "अपनी सीखने की यात्रा की निगरानी करें, पिछले निर्णयों की समीक्षा करें, और व्यवस्थित रूप से अपना कानूनी ज्��ान बनाएं।",
    "home.missionTitle": "हमारा मिशन: सभी के लिए न्याय",
    "home.missionDesc":
      "हमारा मानना है कि हर व्यक्ति को अपने कानूनी अधिकारों और अपने कार्यों के परिणामो�� को समझने का अधिकार है। जस्टिस जर्नी कानूनी शिक्षा को सुलभ बनाता है, विशेष रूप से युवाओं और वंचित समुदायों के लिए।",
    "home.communityFocused": "समुदाय केंद्रित",
    "home.communityDesc":
      "विशेष रूप से युवाओं और वंचित समुदायों के लिए डिज़ाइन किया गया",
    "home.educationalExcellence": "शैक्षिक उत्कृष्टता",
    "home.educationalDesc":
      "सरल, समझने योग्य भाषा में विशेषज्ञ-समीक्षित सामग्री",
    "home.rightsProtection": "अधिकार संरक्षण",
    "home.rightsDesc":
      "लोगों को अपने कान���नी अधिकारों को जानने और उनका प्रयोग करने के लिए सशक्त बनाना",
    "home.quote":
      "कानून का ज्ञान न्याय के लिए आवश्यक है। जब लोग अपने अधिकारों को समझते हैं, ���ो वे अपनी और अपने समुदायों की बेहतर सुरक्षा कर सकते हैं।",
    "home.ctaTitle": "अपनी कानूनी शिक्षा यात्रा शुरू करने के लिए तैयार हैं?",
    "home.ctaSubtitle":
      "हजारों शिक्षार्थियों से जुड़ें जो जस्टिस जर्नी के माध्यम से अपना कानूनी ज्ञान बना रहे हैं और अपने अधिकारों की रक्षा कर रहे हैं।",
    "home.exploreScenarios": "परिदृश्य देखें",
    "home.learnRights": "अपने अधिकार सीखें",

    // Voice Features
    "voice.startListening": "आवाज़ इनपुट शुरू करें",
    "voice.stopListening": "सुनना बंद करें",
    "voice.listening": "सुन रहे हैं...",
    "voice.speak": "जोर ���े पढ़ें",
    "voice.stopSpeaking": "पढ़ना बंद करें",
    "voice.notSupported": "इस ब्राउज़र में वॉइस सुविधाएं समर्थित नहीं हैं",
    "voice.permissionDenied": "माइक्रोफोन की अनुमति अस्वीकृत",
    "voice.networkError": "नेटवर्क त्रुटि हुई",
    "voice.tryAgain": "कृपया पुनः प्रयास करें",

    // Chatbot
    "chat.assistant": "कानूनी सहायक",
    "chat.placeholder":
      'मुझसे कुछ भी पूछें या कहें "मुझे परिदृश्यों में ले जाएं"...',
    "chat.disclaimer":
      'कोशिश करें: "मुझे कानूनी विश्लेषक के पास ले जाएं" या कानूनी प्रश्न पूछें • विशिष्ट सलाह के लिए, किसी वकील से संपर्क करें',
    "chat.quickNav": "त्वरित नेविगेशन:",
    "chat.currentPage": "वर्तमान में:",
    "chat.analyzer": "विश्लेषक",
    "chat.scenarios": "परि���ृश्य",
    "chat.results": "परिणाम",

    // Awareness Hub
    "awareness.title": "संवैधानिक AI कानूनी विश्लेषक",
    "awareness.subtitle":
      "संपूर्ण भारतीय संवैधानिक कानून, IPC, CrPC, और कानूनी मिसालों पर प्रशिक्षित उन्नत AI।",
    "awareness.analyzer.title": "AI कानूनी परिदृश्य विश्लेषक",
    "awareness.analyzer.description":
      "भारतीय संविधान के अनुसार व्यापक कानूनी विश्लेषण।",
    "awareness.analyzer.inputLabel": "अपनी कानूनी स्थिति का वर्णन करें:",
    "awareness.analyzer.analyze": "तत्काल कानूनी विश्लेषण प्राप्त करें",
    "awareness.analyzer.analyzing":
      "आपकी कानूनी स्थिति का विश्लेषण हो रहा है...",
    "awareness.tabs.analyzer": "कानूनी विश्लेषक",
    "awareness.tabs.articles": "लेख",
    "awareness.tabs.rights": "अधिकार",
    "awareness.tabs.cases": "मामले",
    "awareness.tabs.quiz": "प्रश्नोत्तरी",
    "awareness.tabs.help": "सहायता",

    // Common
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि हुई",
    "common.success": "सफलत��",
    "common.cancel": "रद्द करें",
    "common.continue": "जारी रखें",
    "common.back": "वापस",
    "common.next": "आगे",
    "common.submit": "जमा करें",
    "common.close": "बंद करें",
  },

  te: {
    // Navigation
    "nav.home": "హోమ్",
    "nav.awareness": "అవగాహన కేంద్రం",
    "nav.scenarios": "పరిస్థితి అనుకరణ",
    "nav.results": "ఫలితాలు",
    "nav.getStarted": "ప్రారంభించండి",
    "nav.language": "భాష",

    // Homepage
    "home.title": "మీ చట్టపరమైన హక్కులను తెలుసుకోండి",
    "home.subtitle":
      "జస్టిస్ జర్నీ యువకులను మరియు కమ్యూనిటీలను ఇంటరాక్టివ్ చట్టపరమైన విద్యతో శక్తివంతం చేస్తుంది. మీ హక్కుల గురించి తెలుసుకోండి, పరిణామాలను అర్��ం చేసుకోండి, మరియు ఆకర్షణీయ దృశ్���ాలు మరియు నిపుణుల మార్గదర్శనం ద��వారా చట్టపరమైన పరిస్థితులను విశ్వాసంతో నావిగేట్ చేయండి.",
    "home.startJourney": "మీ ప్రయాణాన్ని ప్రారంభించండి",
    "home.exploreResources": "వనరులను అన్వేషించండి",

    // Voice Features
    "voice.startListening": "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
    "voice.stopListening": "వినడం ఆపండి",
    "voice.listening": "వింటోంది...",
    "voice.speak": "బిగ్గరగా చదవండి",
    "voice.stopSpeaking": "చదవడం ఆపండి",

    // Common
    "common.loading": "లోడ్ అవుతోంది...",
    "common.error": "లోపం జరిగింది",
    "common.success": "విజయం",
  },

  // Add more languages as needed...
};

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("justice-journey-language");
    if (stored && Object.keys(translations).includes(stored)) {
      return stored as Language;
    }
    // Auto-detect browser language
    const browserLang = navigator.language.split("-")[0];
    return Object.keys(translations).includes(browserLang)
      ? (browserLang as Language)
      : "en";
  });

  const isRTL = language === "ur";

  useEffect(() => {
    localStorage.setItem("justice-journey-language", language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  const t = (key: string, params?: Record<string, string>) => {
    let text = translations[language]?.[key] || translations.en[key] || key;

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{{${param}}}`, value);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export { languages };
