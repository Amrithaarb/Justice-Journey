import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    keywords: ["constitutional rights", "fundamental rights", "article 14", "article 19", "article 21", "article 22", "rights"],
    response: `<strong>Your Fundamental Rights under Indian Constitution:</strong>

🛡️ <strong>Article 14</strong> - Right to Equality before law
🗣️ <strong>Article 19</strong> - Six fundamental freedoms (speech, assembly, movement, etc.)
❤️ <strong>Article 21</strong> - Right to Life and Personal Liberty (most important)
🔒 <strong>Article 22</strong> - Protection against arrest and detention
⚖️ <strong>Article 20</strong> - Protection against double jeopardy

<strong>Key Points:</strong>
• These rights are enforceable in courts
• You can approach High Court (Article 226) or Supreme Court (Article 32)
• Emergency can suspend some rights temporarily
• These rights apply to all citizens and some to non-citizens too

Would you like details about any specific right?`,
    suggestions: ["Article 21 details", "How to enforce rights?", "Emergency provisions", "Article 32 remedies"]
  },

  fir_process: {
    keywords: ["fir", "file fir", "police complaint", "first information report", "crime report"],
    response: `<strong>How to File an FIR (First Information Report):</strong>

📋 <strong>Step-by-Step Process:</strong>
1. <strong>Visit nearest police station</strong> to crime location
2. <strong>Oral/Written complaint</strong> - Police must register
3. <strong>Free copy</strong> of FIR with registration number
4. <strong>No fee</strong> required for filing FIR

🔍 <strong>What to Include:</strong>
• Date, time, location of incident
• Detailed description of events
• Names/descriptions of accused
• Witness information
• Evidence details

⚖️ <strong>Your Rights:</strong>
• Police CANNOT refuse cognizable offenses
• FIR copy is your legal right
• You can file in any language
• Zero FIR for jurisdiction issues

<strong>Important:</strong> Keep FIR copy safe - it's crucial for legal proceedings!`,
    suggestions: ["What if police refuse FIR?", "Cognizable vs non-cognizable", "Zero FIR explained", "After filing FIR"]
  },

  arrest_rights: {
    keywords: ["arrested", "arrest rights", "police arrest", "custody", "detention", "miranda rights"],
    response: `<strong>Your Rights During Arrest (Article 22):</strong>

🚨 <strong>Immediate Rights:</strong>
• <strong>Right to know</strong> grounds of arrest
• <strong>Right to remain silent</strong> - don't self-incriminate
• <strong>Right to lawyer</strong> - demand immediately
• <strong>Right to inform</strong> family/friends within 24 hours

⏰ <strong>Time Limits:</strong>
• <strong>24 hours</strong> maximum without Magistrate
• <strong>15 days</strong> police custody maximum (in parts)
• <strong>90 days</strong> total investigation period

📞 <strong>Essential Actions:</strong>
1. Ask "Why am I being arrested?"
2. Say "I want my lawyer present"
3. Don't sign anything without lawyer
4. Request family notification
5. Stay calm and don't resist

<strong>Remember:</strong> Even if arrested wrongly, never resist physically. Fight legally!`,
    suggestions: ["What is bail?", "False arrest remedies", "Police harassment", "Legal aid options"]
  },

  domestic_violence: {
    keywords: ["domestic violence", "dowry", "498a", "domestic abuse", "wife beating", "harassment"],
    response: `<strong>Legal Help for Domestic Violence:</strong>

🆘 <strong>Immediate Help:</strong>
• <strong>Women Helpline: 181</strong> (24x7)
• <strong>Police: 100</strong> for emergency
• <strong>Childline: 1098</strong> if children involved

⚖️ <strong>Legal Protections:</strong>
• <strong>IPC Section 498A</strong> - Domestic violence (up to 3 years)
• <strong>Domestic Violence Act 2005</strong> - Protection orders
• <strong>Dowry Prohibition Act 1961</strong> - Anti-dowry laws

🛡️ <strong>Available Remedies:</strong>
• <strong>Protection Order</strong> - Immediate safety
• <strong>Residence Order</strong> - Right to stay
• <strong>Monetary Relief</strong> - Maintenance/compensation
• <strong>Custody Order</strong> - Children protection

📋 <strong>Steps to Take:</strong>
1. Report to police immediately
2. Medical examination if injured
3. Approach Protection Officer
4. File case in Magistrate Court
5. Seek legal aid (free available)

You're not alone - help is available!`,
    suggestions: ["Protection Officer contact", "Free legal aid", "Evidence collection", "Safety planning"]
  },

  cybercrime: {
    keywords: ["cybercrime", "online fraud", "hacking", "cyber harassment", "phishing", "identity theft"],
    response: `<strong>Cybercrime Reporting & Protection:</strong>

🌐 <strong>Report Immediately:</strong>
• <strong>cybercrime.gov.in</strong> - National portal
• <strong>Local Cyber Cell</strong> - Nearest police station
• <strong>I4C helpline: 155260</strong> for assistance

⚖️ <strong>IT Act 2000 Protections:</strong>
• <strong>Section 66</strong> - Computer fraud (3 years + ₹5 lakh)
• <strong>Section 66C</strong> - Identity theft (3 years + ₹1 lakh)
• <strong>Section 66D</strong> - Cheating using computer
• <strong>Section 43A</strong> - Data protection compensation

🔒 <strong>Evidence Preservation:</strong>
• Take screenshots with timestamps
• Save email headers and logs
• Document financial losses
• Collect witness statements
• Don't delete anything

💡 <strong>Prevention Tips:</strong>
• Strong, unique passwords
• Two-factor authentication
• Verify before clicking links
• Regular software updates
• Privacy settings check

<strong>Act fast - digital evidence can disappear!</strong>`,
    suggestions: ["Cyber insurance claims", "Digital forensics", "Online safety tips", "Recovery process"]
  },

  legal_aid: {
    keywords: ["legal aid", "free lawyer", "legal services", "poor person", "unable to afford"],
    response: `<strong>Free Legal Aid Services:</strong>

🆓 <strong>Constitutional Right (Article 39A):</strong>
Everyone has right to free legal aid if unable to afford

🏛️ <strong>Where to Get Free Legal Aid:</strong>
• <strong>District Legal Services Authority (DLSA)</strong>
• <strong>State Legal Services Authority (SLSA)</strong>
• <strong>National Legal Services Authority (NALSA)</strong>
• <strong>Lok Adalat</strong> - Alternative dispute resolution

👥 <strong>Eligibility Criteria:</strong>
• Income below ₹9,000/month (rural: ₹6,000)
• SC/ST/Women automatically eligible
• Children and disabled persons
• Victims of trafficking/acid attacks
• Senior citizens above 65

📋 <strong>Services Provided:</strong>
• Free lawyer representation
• Court fee exemption
• Legal advice and consultation
• Mediation and arbitration
• Legal literacy programs

<strong>Contact your nearest DLSA - legal aid is your right!</strong>`,
    suggestions: ["Find nearest DLSA", "Lok Adalat process", "Legal aid documents", "Women's legal aid"]
  }
};

export function LegalChatbot() {
  const location = useLocation();
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
          suggestions: ['What is Justice Journey?', 'How to get started?', 'Legal rights overview', 'Navigate to Legal Analyzer']
        };
      case '/awareness':
        return {
          pageName: 'Awareness Hub',
          context: 'You\'re in the Awareness Hub with our AI Legal Analyzer. Ask me anything about Indian law!',
          suggestions: ['How to use Legal Analyzer?', 'Constitutional rights help', 'File FIR guidance', 'Cybercrime protection']
        };
      case '/scenarios':
        return {
          pageName: 'Scenario Simulation',
          context: 'Practice legal decision-making with interactive scenarios.',
          suggestions: ['How scenarios work?', 'Tips for scenarios', 'Legal decision making', 'What after scenarios?']
        };
      case '/results':
        return {
          pageName: 'Results Dashboard',
          context: 'Track your learning progress and achievements.',
          suggestions: ['Understanding results', 'Improve scores', 'Next learning steps', 'Certification options']
        };
      case '/dashboard':
        return {
          pageName: 'Dashboard',
          context: 'Your personalized learning dashboard with goals and recommendations.',
          suggestions: ['Set learning goals', 'Track progress', 'Recommended content', 'Legal skill building']
        };
      default:
        return {
          pageName: 'Justice Journey',
          context: 'Navigate through our legal education platform.',
          suggestions: ['Platform overview', 'Legal basics', 'Your rights', 'Get legal help']
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
        text: `**How to Use Justice Journey:**

📍 **Currently on:** ${pageContext.pageName}

🎯 **Available Features:**
• **Awareness Hub** - AI legal analyzer & constitutional rights education
• **Scenario Simulation** - Interactive legal decision-making practice
• **Results Dashboard** - Track learning progress and achievements
• **Legal Resources** - Emergency contacts and legal aid information

**Navigation Tips:**
• Use the top menu to switch between sections
• Try the AI Legal Analyzer for instant legal analysis
• Complete scenarios to build practical knowledge
• Check Results to monitor your progress

**Current Page Help:**
${pageContext.context}

Which feature would you like to explore?`,
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
        text: `🚨 **Emergency Legal Contacts:**

**Immediate Danger:**
• **Police: 100**
• **Women Helpline: 181**
• **Child Helpline: 1098**

**Legal Emergency:**
• **Legal Aid: Contact nearest DLSA**
• **Lawyer: Arrange through Bar Association**
• **Court: File urgent application**

**Remember:**
• In physical danger - call police first
• Document everything if safe to do so
• Contact family/friends for support
• Seek medical help if injured

**This is general guidance - consult a lawyer for specific advice.**`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ["Find nearest police station", "Legal aid contacts", "Document evidence", "Safety planning"]
      };
    }

    // Default response with guidance
    return {
      id: Date.now().toString(),
      text: `I understand you're asking about "${userMessage}". While I don't have specific information on that topic, I can help you with:

🔍 **Legal Topics I Cover:**
• Constitutional rights and procedures
• Criminal law and FIR filing
• Domestic violence protection
• Cybercrime reporting
• Legal aid and free services
• Court procedures and bail

💡 **For Specific Legal Analysis:**
Use our **AI Legal Analyzer** in the Awareness Hub for detailed analysis of your specific situation.

**Need immediate help?** Contact:
• Police: 100 (Emergency)
• Legal Aid: Nearest DLSA office
• Women Helpline: 181

What specific legal topic can I help you with?`,
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
                            <a
                              key={index}
                              href={link.url}
                              target={link.url.startsWith('http') ? '_blank' : '_self'}
                              rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                              className="flex items-center text-xs text-justice-primary hover:underline"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              {link.title}
                            </a>
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
