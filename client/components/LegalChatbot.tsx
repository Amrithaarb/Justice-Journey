import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Lightbulb,
  Scale,
  BookOpen,
  Phone,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
  links?: { title: string; url: string; }[];
}

const quickReplies = [
  "What are my constitutional rights?",
  "How do I file an FIR?", 
  "What should I do if arrested?",
  "Legal help for domestic violence",
  "Cybercrime reporting process",
  "Consumer rights and protection",
  "How to get legal aid?",
  "Property dispute guidance"
];

const legalKnowledgeBase = {
  greetings: [
    "Hello! I'm JJBot, your AI legal assistant. I can help you with legal queries, guide you through procedures, and provide information about your rights under Indian law.",
    "Hi there! I'm here to assist you with legal questions and guide you through Justice Journey's resources. How can I help you today?",
    "Welcome to Justice Journey! I'm your legal AI assistant, trained on Indian constitutional law and legal procedures. What would you like to know?"
  ],
  
  constitutional_rights: {
    keywords: ["constitutional rights", "fundamental rights", "article 14", "article 19", "article 21", "article 22", "rights", "constitution", "equality", "freedom", "liberty", "speech", "expression", "movement", "assembly"],
    response: `<strong>Your Fundamental Rights under Indian Constitution:</strong>

<strong>Article 14</strong> - Right to Equality before law and equal protection of laws
<strong>Article 19</strong> - Six fundamental freedoms including speech, assembly, movement, occupation, residence, and property
<strong>Article 21</strong> - Right to Life and Personal Liberty (most expansive right in Indian Constitution)
<strong>Article 22</strong> - Protection against arrest and detention in custody
<strong>Article 20</strong> - Protection against double jeopardy and self-incrimination

<strong>Key Points:</strong>
• These rights are enforceable in courts through writ petitions
• You can approach High Court under Article 226 or Supreme Court under Article 32
• During Emergency, some fundamental rights can be suspended temporarily
• These rights apply to all citizens and some rights extend to non-citizens as well
• Violation of fundamental rights can be challenged in constitutional courts

Would you like detailed information about any specific fundamental right?`,
    suggestions: ["Article 21 details", "How to enforce rights?", "Emergency provisions", "Article 32 remedies"]
  },

  fir_process: {
    keywords: ["fir", "file fir", "police complaint", "first information report", "crime report", "report crime", "police station", "complaint", "criminal case", "file case"],
    response: `<strong>How to File an FIR (First Information Report):</strong>

<strong>Step-by-Step Process:</strong>
1. <strong>Visit the nearest police station</strong> that has jurisdiction over the area where crime occurred
2. <strong>Give oral or written complaint</strong> - Police are legally bound to register FIR for cognizable offenses
3. <strong>Obtain free copy</strong> of FIR with unique registration number
4. <strong>No fee required</strong> - Filing FIR is completely free under Indian law

<strong>Essential Information to Include:</strong>
• Exact date, time, and location of incident
• Detailed chronological description of events
• Names and physical descriptions of accused persons
• Complete witness information with contact details
• List of evidence available or collected

<strong>Your Legal Rights During FIR Filing:</strong>
• Police cannot refuse to register FIR for cognizable offenses under CrPC Section 154
• You have absolute right to receive free copy of FIR immediately
• FIR can be filed in any language you are comfortable with
• Zero FIR can be filed if crime occurred outside station jurisdiction
• If police refuse, you can approach Superintendent of Police or Magistrate

<strong>Important Legal Point:</strong> Keep your FIR copy safe as it serves as primary legal document for all future proceedings in your case.`,
    suggestions: ["What if police refuse FIR?", "Cognizable vs non-cognizable", "Zero FIR explained", "After filing FIR"]
  },

  arrest_rights: {
    keywords: ["arrested", "arrest rights", "police arrest", "custody", "detention", "miranda rights", "arrest", "police custody", "bail", "lawyer", "legal representation", "remain silent"],
    response: `<strong>Your Constitutional Rights During Arrest (Article 22):</strong>

<strong>Immediate Fundamental Rights:</strong>
• <strong>Right to know grounds of arrest</strong> - Police must inform you why you are being arrested
• <strong>Right to remain silent</strong> - You cannot be compelled to be a witness against yourself
• <strong>Right to legal representation</strong> - You can demand a lawyer immediately
• <strong>Right to inform family/friends</strong> - Must be allowed within 24 hours of arrest

<strong>Legal Time Limits Under CrPC:</strong>
• <strong>24 hours maximum</strong> in police custody without being presented before Magistrate
• <strong>15 days maximum</strong> total police custody (can be given in parts during investigation)
• <strong>90 days total</strong> for investigation period before filing charge sheet

<strong>Essential Actions to Take:</strong>
1. Clearly ask "What are the specific charges and grounds for my arrest?"
2. State firmly "I want my legal counsel present before any questioning"
3. Do not sign any document without your lawyer reviewing it
4. Request immediate notification of family members or friends
5. Remain calm and do not physically resist even if arrest seems unlawful

<strong>Important Legal Principle:</strong> Even if you believe the arrest is completely wrong or illegal, never resist physically. Challenge the arrest through proper legal channels with help of a competent lawyer.`,
    suggestions: ["What is bail?", "False arrest remedies", "Police harassment", "Legal aid options"]
  },

  domestic_violence: {
    keywords: ["domestic violence", "dowry", "498a", "domestic abuse", "wife beating", "harassment"],
    response: `<strong>Legal Protection Against Domestic Violence:</strong>

<strong>Immediate Emergency Assistance:</strong>
• <strong>Women Helpline: 181</strong> - Available 24x7 for immediate help and guidance
• <strong>Police Emergency: 100</strong> - For immediate physical danger situations
• <strong>Childline: 1098</strong> - If children are involved or at risk

<strong>Legal Protections Available:</strong>
• <strong>IPC Section 498A</strong> - Cruelty by husband or relatives (imprisonment up to 3 years)
• <strong>Protection of Women from Domestic Violence Act 2005</strong> - Comprehensive protection framework
• <strong>Dowry Prohibition Act 1961</strong> - Legal action against dowry demands

<strong>Court Orders You Can Obtain:</strong>
• <strong>Protection Order</strong> - Immediate safety from abuser, prevents contact
• <strong>Residence Order</strong> - Legal right to continue living in shared household
• <strong>Monetary Relief</strong> - Maintenance, compensation for injuries and losses
• <strong>Custody Order</strong> - Temporary custody of children for safety

<strong>Legal Steps to Take:</strong>
1. File police complaint immediately - FIR under IPC Section 498A
2. Get medical examination done if physically injured - preserve medical evidence
3. Approach designated Protection Officer in your district
4. File petition in Magistrate Court under Domestic Violence Act
5. Apply for free legal aid through District Legal Services Authority

Remember: You have constitutional right to live with dignity. Legal help and protection are available through multiple agencies.`,
    suggestions: ["Protection Officer contact", "Free legal aid", "Evidence collection", "Safety planning"]
  },

  cybercrime: {
    keywords: ["cybercrime", "online fraud", "hacking", "cyber harassment", "phishing", "identity theft", "internet crime", "digital fraud", "online scam", "cyber attack", "data theft", "computer crime", "digital harassment"],
    response: `<strong>Cybercrime Reporting and Legal Protection:</strong>

<strong>Where to Report Cybercrime:</strong>
• <strong>cybercrime.gov.in</strong> - National Cyber Crime Reporting Portal (24x7 online reporting)
• <strong>Local Cyber Crime Police Station</strong> - Nearest specialized cyber cell
• <strong>I4C helpline: 155260</strong> - Indian Cyber Crime Coordination Centre assistance

<strong>Legal Provisions Under IT Act 2000:</strong>
• <strong>Section 66</strong> - Computer related offenses (imprisonment up to 3 years + fine up to ₹5 lakh)
• <strong>Section 66C</strong> - Identity theft and impersonation (3 years + ₹1 lakh fine)
• <strong>Section 66D</strong> - Cheating by personation using computer resources
• <strong>Section 43A</strong> - Data protection violations and compensation liability

<strong>Critical Evidence Preservation Steps:</strong>
• Take complete screenshots with visible timestamps and URLs
• Save original email headers and server logs
• Document all financial losses with bank statements
• Collect witness statements from people who saw the crime
• Preserve all digital communications - do not delete anything

<strong>Prevention and Security Measures:</strong>
• Use strong, unique passwords for different accounts
• Enable two-factor authentication wherever available
• Verify sender identity before clicking any links or attachments
• Keep software and antivirus programs regularly updated
• Review and tighten privacy settings on all social media accounts

<strong>Important:</strong> Time is critical in cybercrime cases as digital evidence can be easily destroyed or tampered with. Report immediately for best chance of recovery and prosecution.`,
    suggestions: ["Cyber insurance claims", "Digital forensics", "Online safety tips", "Recovery process"]
  },

  legal_aid: {
    keywords: ["legal aid", "free lawyer", "legal services", "poor person", "unable to afford", "free legal help", "dlsa", "nalsa", "legal assistance", "pro bono", "legal help", "cannot afford lawyer"],
    response: `<strong>Free Legal Aid Services Under Indian Constitution:</strong>

<strong>Constitutional Right (Article 39A):</strong>
Every person has fundamental right to free legal aid if financially unable to afford legal representation. This is essential for ensuring equal justice under law.

<strong>Where to Access Free Legal Aid:</strong>
• <strong>District Legal Services Authority (DLSA)</strong> - Primary contact point in each district
• <strong>State Legal Services Authority (SLSA)</strong> - State level coordination and oversight
• <strong>National Legal Services Authority (NALSA)</strong> - National apex body for legal services
• <strong>Lok Adalat</strong> - Alternative dispute resolution mechanism with free services

<strong>Eligibility Criteria for Free Legal Aid:</strong>
• Annual income below ₹9,000 in urban areas (₹6,000 in rural areas)
• Members of Scheduled Castes, Scheduled Tribes automatically eligible regardless of income
• Women and children in all cases
• Persons with disabilities and mental illness
• Victims of human trafficking and acid attacks
• Senior citizens above 65 years of age

<strong>Legal Services Provided Free of Cost:</strong>
• Complete legal representation by qualified advocates
• Court fees and legal documentation exemption
• Legal advice and consultation at all stages
• Mediation and arbitration services
• Legal literacy and awareness programs
• Assistance in drafting legal documents

<strong>How to Apply:</strong>
Contact your nearest District Legal Services Authority office with income certificate and identity proof. Legal aid is your constitutional right under Article 39A.`,
    suggestions: ["Find nearest DLSA", "Lok Adalat process", "Legal aid documents", "Women's legal aid"]
  }
};

export function LegalChatbot() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getPageContext = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return {
          pageName: 'Homepage',
          context: 'Welcome to Justice Journey! This is your starting point for legal education.',
          suggestions: ['Take me to Legal Analyzer', 'Start with scenarios', 'Learn about my rights', 'What can this platform do?'],
          navigationSuggestions: ['Go to Awareness Hub', 'Try Scenario Simulation', 'View my Results']
        };
      case '/awareness':
        return {
          pageName: 'Awareness Hub',
          context: 'You\'re in the Awareness Hub with our AI Legal Analyzer. Ask me anything about Indian law!',
          suggestions: ['Analyze my legal situation', 'Constitutional rights help', 'How to file FIR', 'Cybercrime protection'],
          navigationSuggestions: ['Try practice scenarios', 'Check my progress', 'Back to homepage']
        };
      case '/scenarios':
        return {
          pageName: 'Scenario Simulation',
          context: 'Practice legal decision-making with interactive scenarios.',
          suggestions: ['How do scenarios work?', 'Tips for better decisions', 'Legal reasoning help', 'What scenarios are available?'],
          navigationSuggestions: ['Use Legal Analyzer', 'Check my results', 'Get legal help']
        };
      case '/results':
        return {
          pageName: 'Results Dashboard',
          context: 'Track your learning progress and achievements.',
          suggestions: ['How to improve scores?', 'What do my results mean?', 'Next learning steps', 'Study recommendations'],
          navigationSuggestions: ['Practice more scenarios', 'Get legal analysis', 'Learn about rights']
        };
      case '/dashboard':
        return {
          pageName: 'Dashboard',
          context: 'Your personalized learning dashboard with goals and recommendations.',
          suggestions: ['Set learning goals', 'Track my progress', 'Get recommendations', 'Legal skill building'],
          navigationSuggestions: ['Analyze legal situation', 'Practice scenarios', 'View detailed results']
        };
      default:
        return {
          pageName: 'Justice Journey',
          context: 'Navigate through our legal education platform.',
          suggestions: ['Platform overview', 'Legal basics', 'Your rights', 'Get legal help'],
          navigationSuggestions: ['Go to Awareness Hub', 'Try scenarios', 'View homepage']
        };
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const pageContext = getPageContext();
      // Formatted welcome message with paragraphs
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `<p>Hello! I'm JJBot, your AI legal assistant. Welcome to Justice Journey! This is your starting point for legal education. I can help you with: </p>
<p>• Legal questions and constitutional rights </p>
<p>• Navigation and platform features </p>
<p>• Legal procedures and documentation </p>
<p>• Emergency legal contacts and guidance</p>
<p>What would you like to know?</p>`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: pageContext.suggestions
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length, location.pathname]);

  const generateBotResponse = (userMessage: string): Message => {
    const lowercaseMessage = userMessage.toLowerCase();

    // Check for navigation commands first
    const navigationResponse = handleNavigationCommand(userMessage);
    if (navigationResponse) {
      return navigationResponse;
    }

    // Check knowledge base
    for (const [key, data] of Object.entries(legalKnowledgeBase)) {
      if (key === 'greetings') continue;

      const topicData = data as any;
      if (topicData.keywords.some((keyword: string) => lowercaseMessage.includes(keyword))) {
        return {
          id: Date.now().toString(),
          text: topicData.response,
          sender: 'bot',
          timestamp: new Date(),
          suggestions: topicData.suggestions
        };
      }
    }

    // Greeting responses
    if (lowercaseMessage.includes('hi') || lowercaseMessage.includes('hello') || lowercaseMessage.includes('hey')) {
      return {
        id: Date.now().toString(),
        text: legalKnowledgeBase.greetings[Math.floor(Math.random() * legalKnowledgeBase.greetings.length)],
        sender: 'bot',
        timestamp: new Date(),
        suggestions: quickReplies.slice(0, 4)
      };
    }

    // Navigation help
    if (lowercaseMessage.includes('navigate') || lowercaseMessage.includes('use') || lowercaseMessage.includes('feature')) {
      const pageContext = getPageContext();
      return {
        id: Date.now().toString(),
        text: `<strong>How to Use Justice Journey Platform:</strong>

<strong>Currently on:</strong> ${pageContext.pageName}

<strong>Available Platform Features:</strong>
• <strong>Awareness Hub</strong> - Advanced AI legal analyzer with constitutional rights education
• <strong>Scenario Simulation</strong> - Interactive legal decision-making practice modules
• <strong>Results Dashboard</strong> - Comprehensive learning progress tracking and achievements
• <strong>Legal Resources</strong> - Emergency contacts, legal aid information, and helplines

<strong>Navigation and Usage Tips:</strong>
• Use the main navigation menu to switch between different platform sections
• Try the AI Legal Analyzer for detailed analysis of specific legal situations
• Complete scenario simulations to build practical legal knowledge and decision-making skills
• Regularly check Results dashboard to monitor your learning progress and areas for improvement

<strong>Current Page Context:</strong>
${pageContext.context}

Which specific feature or section would you like to explore in detail?`,
        suggestions: pageContext.suggestions,
        links: [
          { title: "Go to Legal Analyzer", url: "/awareness" },
          { title: "Try Scenarios", url: "/scenarios" },
          { title: "View Results", url: "/results" }
        ]
      };
    }

    // Emergency situations
    if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('urgent') || lowercaseMessage.includes('help immediately')) {
      return {
        id: Date.now().toString(),
        text: `<strong>Emergency Legal Contacts and Procedures:</strong>

<strong>Immediate Physical Danger:</strong>
• <strong>Police Emergency: 100</strong> - For immediate law enforcement response
• <strong>Women Helpline: 181</strong> - 24x7 support for women in distress
• <strong>Child Helpline: 1098</strong> - Emergency assistance for children at risk

<strong>Legal Emergency Assistance:</strong>
• <strong>Legal Aid Services: Contact nearest District Legal Services Authority (DLSA)</strong>
• <strong>Advocate Services: Arrange through local Bar Association</strong>
• <strong>Court Urgency: File urgent application through duty magistrate</strong>

<strong>Important Safety and Legal Guidelines:</strong>
• If in immediate physical danger, call police emergency services first
• Document all evidence if it is safe to do so - photographs, witness details, medical records
• Immediately contact trusted family members or friends for support
• Seek proper medical examination and treatment if injured
• Preserve all relevant documents and evidence for legal proceedings

<strong>Legal Disclaimer:</strong>
This is general guidance for emergency situations. For specific legal advice tailored to your case, immediately consult with a qualified advocate or legal expert familiar with applicable laws.`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["Find nearest police station", "Legal aid contacts", "Document evidence", "Safety planning"]
      };
    }

    // Default response with guidance
    return {
      id: Date.now().toString(),
      text: `I understand you're asking about "${userMessage}". While I don't have specific information on that exact topic, I can provide comprehensive assistance with:

<strong>Legal Topics I Specialize In:</strong>
• Constitutional rights and fundamental freedoms under Indian Constitution
• Criminal law procedures including FIR filing and arrest rights
• Domestic violence protection under various legal frameworks
• Cybercrime reporting and IT Act provisions
• Free legal aid services and eligibility criteria
• Court procedures, bail applications, and legal remedies

<strong>For Detailed Legal Analysis:</strong>
Use our advanced <strong>AI Legal Analyzer</strong> available in the Awareness Hub section for comprehensive analysis of your specific legal situation with constitutional references and procedural guidance.

<strong>Need immediate legal assistance?</strong> Contact:
• Police Emergency: 100 (For immediate danger)
• Legal Aid Services: Nearest District Legal Services Authority office
• Women Helpline: 181 (24x7 support for women)

Could you please specify which particular legal topic or area you would like detailed information about?`,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: quickReplies.slice(0, 4),
      links: [
        { title: "AI Legal Analyzer", url: "/awareness" },
        { title: "Legal Scenarios", url: "/scenarios" },
        { title: "Find Legal Aid", url: "https://nalsa.gov.in" }
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage.text);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  const handleNavigationCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();

    // Navigation commands
    if (lowerCommand.includes('go to') || lowerCommand.includes('take me to') || lowerCommand.includes('navigate to')) {
      if (lowerCommand.includes('awareness') || lowerCommand.includes('legal analyzer') || lowerCommand.includes('analyzer')) {
        navigate('/awareness');
        setIsMinimized(true); // Minimize chatbot to show the page
        return generateNavigationResponse('Awareness Hub', '/awareness');
      } else if (lowerCommand.includes('scenario') || lowerCommand.includes('simulation') || lowerCommand.includes('practice')) {
        navigate('/scenarios');
        setIsMinimized(true);
        return generateNavigationResponse('Scenario Simulation', '/scenarios');
      } else if (lowerCommand.includes('result') || lowerCommand.includes('progress') || lowerCommand.includes('dashboard')) {
        navigate('/results');
        setIsMinimized(true);
        return generateNavigationResponse('Results Dashboard', '/results');
      } else if (lowerCommand.includes('home') || lowerCommand.includes('homepage')) {
        navigate('/');
        setIsMinimized(true);
        return generateNavigationResponse('Homepage', '/');
      }
    }

    return null;
  };

  const generateNavigationResponse = (destination: string, path: string) => {
    return {
      id: Date.now().toString(),
      text: `<strong>Navigation Complete!</strong>

I've taken you to the <strong>${destination}</strong>. The chatbot is now minimized so you can explore the page.

<strong>What you can do here:</strong>
${getPageSpecificInfo(path)}

Click the chat button anytime to continue our conversation while using the platform!`,
      sender: 'bot' as const,
      timestamp: new Date(),
      suggestions: getPageContext().suggestions
    };
  };

  const getPageSpecificInfo = (path: string) => {
    switch (path) {
      case '/awareness':
        return '• Use the AI Legal Analyzer for instant legal analysis\n• Read detailed legal articles and guides\n• Learn about constitutional rights\n• Access legal resources and precedents';
      case '/scenarios':
        return '• Practice with interactive legal scenarios\n• Make decisions and see consequences\n• Learn from real-world legal situations\n• Build practical legal knowledge';
      case '/results':
        return '• View your learning progress and achievements\n• See scenario completion statistics\n• Track knowledge improvement over time\n• Get personalized learning recommendations';
      case '/':
        return '• Get started with the platform overview\n• Choose your learning path\n• Access all Justice Journey features\n• Learn about legal rights and procedures';
      default:
        return '• Explore the current section\n• Use navigation menu for other areas\n• Ask me for help anytime';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-12 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
          Legal Assistant
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80' : 'w-96'}`}>
      <Card className={`shadow-2xl border-2 border-justice-primary/20 ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-justice-primary to-justice-secondary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">JJBot</CardTitle>
                <p className="text-xs text-white/80">AI Legal Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {!isMinimized && (
            <div className="flex items-center space-x-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-white/90">Online & Ready to Help</span>
            </div>
          )}
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-[532px] p-0">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-2 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`p-2 rounded-full ${message.sender === 'user' ? 'bg-justice-primary text-white' : 'bg-gray-100'}`}>
                          {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-justice-primary" />}
                        </div>
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-justice-primary text-white'
                            : 'bg-gray-50 text-gray-900'
                        }`}>
                          <div
                            className="text-sm whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: message.text }}
                          />
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp && message.timestamp instanceof Date
                              ? message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            }
                          </div>
                        </div>
                      </div>
                      
                      {/* Suggestions */}
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="mt-2 space-y-2">
                          <p className="text-xs text-gray-600 ml-10">Quick suggestions:</p>
                          <div className="grid grid-cols-1 gap-1 ml-10">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="text-xs h-8 justify-start hover:bg-justice-primary/10"
                              >
                                <Lightbulb className="h-3 w-3 mr-1" />
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      {message.links && message.links.length > 0 && (
                        <div className="mt-2 space-y-1 ml-10">
                          {message.links.map((link, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (link.url.startsWith('http')) {
                                  window.open(link.url, '_blank', 'noopener noreferrer');
                                } else {
                                  navigate(link.url);
                                  setIsMinimized(true);
                                }
                              }}
                              className="flex items-center text-xs text-justice-primary hover:underline cursor-pointer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {link.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-full bg-gray-100">
                        <Bot className="h-4 w-4 text-justice-primary" />
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your legal rights..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-justice-primary hover:bg-justice-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                For specific legal advice, consult a qualified lawyer
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
