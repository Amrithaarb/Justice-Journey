import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  BookOpen, 
  Shield, 
  Eye, 
  HelpCircle, 
  Phone, 
  AlertTriangle,
  CheckCircle,
  X,
  ArrowRight,
  Scale,
  Handcuffs,
  FileText,
  Users,
  Heart,
  MessageCircle
} from "lucide-react";

const lawArticles = [
  {
    id: "cyberbullying",
    title: "Understanding Cyberbullying Laws",
    category: "Digital Rights",
    readTime: "5 min read",
    summary: "Learn what constitutes cyberbullying and your legal options",
    content: "Cyberbullying is harassment that occurs through electronic communication. Most states have specific laws that make cyberbullying a criminal offense, especially when it involves minors. Key elements include repeated harassment, threats, or humiliation through digital platforms."
  },
  {
    id: "arrest-rights",
    title: "Your Rights During Arrest",
    category: "Constitutional Rights", 
    readTime: "7 min read",
    summary: "Essential knowledge about Miranda rights and police procedures",
    content: "When arrested, you have the right to remain silent, the right to an attorney, and the right to have an attorney provided if you cannot afford one. Police must inform you of these rights before interrogation."
  },
  {
    id: "self-defense",
    title: "Self-Defense Laws Explained", 
    category: "Criminal Law",
    readTime: "6 min read",
    summary: "When is self-defense legally justified?",
    content: "Self-defense laws allow you to protect yourself from imminent harm, but the force used must be proportional to the threat. Understanding the legal boundaries can help you make informed decisions in dangerous situations."
  },
  {
    id: "workplace-harassment",
    title: "Workplace Rights and Harassment",
    category: "Employment Law",
    readTime: "8 min read", 
    summary: "Know your rights in the workplace",
    content: "Employees are protected from discrimination and harassment based on race, gender, religion, and other protected characteristics. Learn how to identify violations and take appropriate legal action."
  }
];

const rightsGuides = [
  {
    id: "police-interaction",
    title: "Interacting with Police",
    icon: Shield,
    points: [
      "You have the right to remain silent",
      "Ask 'Am I free to leave?' if not under arrest",
      "You can refuse searches without a warrant",
      "Request to see a warrant before allowing searches",
      "Never resist arrest, even if you believe it's wrongful"
    ]
  },
  {
    id: "filing-fir",
    title: "Filing an FIR (First Information Report)",
    icon: FileText,
    points: [
      "Any person can file an FIR for cognizable offenses",
      "Police are legally required to register your complaint",
      "You have the right to get a copy of the FIR",
      "FIR must be filed at the nearest police station",
      "Include all relevant details and evidence"
    ]
  },
  {
    id: "legal-representation",
    title: "Right to Legal Representation",
    icon: Scale,
    points: [
      "You have the right to an attorney during questioning",
      "Legal aid is available if you cannot afford a lawyer",
      "You can request to contact a lawyer before answering questions",
      "Attorney-client privilege protects your communications",
      "You can change lawyers if needed"
    ]
  }
];

const storyCards = [
  {
    id: "teen-theft",
    title: "Teen Shoplifting Case",
    scenario: "Alex, 16, took a candy bar without paying",
    outcome: "Juvenile diversion program instead of criminal charges",
    lesson: "First-time juvenile offenders often qualify for alternative programs focused on education rather than punishment.",
    icon: "🍫"
  },
  {
    id: "social-media-threat",
    title: "Online Threat Consequences", 
    scenario: "Sarah posted threatening messages about a classmate",
    outcome: "Criminal charges for cyberbullying and harassment",
    lesson: "Online threats can result in serious criminal charges, even if meant as a joke.",
    icon: "📱"
  },
  {
    id: "underage-drinking",
    title: "Underage Drinking Stop",
    scenario: "Group of teens caught drinking at a party",
    outcome: "MIP (Minor in Possession) citations and community service",
    lesson: "Even possession of alcohol by minors can result in legal consequences affecting college and job prospects.",
    icon: "🚫"
  },
  {
    id: "protest-rights",
    title: "Peaceful Protest Arrest",
    scenario: "College student arrested during peaceful demonstration",
    outcome: "Charges dropped due to constitutional rights violation",
    lesson: "Peaceful protest is a constitutional right, but knowing your boundaries helps avoid legal issues.",
    icon: "✊"
  }
];

const mythsReality = [
  {
    myth: "Police need a warrant to arrest you",
    reality: "Police can arrest you without a warrant if they have probable cause or witness a crime",
    explanation: "Warrants are required for searches, not arrests. However, arrests must be based on probable cause."
  },
  {
    myth: "Juvenile records are automatically sealed",
    reality: "Juvenile records may require a separate legal process to seal or expunge",
    explanation: "While juvenile records are generally more private, they don't automatically disappear and may affect future opportunities."
  },
  {
    myth: "If police don't read Miranda rights, charges are dropped",
    reality: "Miranda rights only affect the use of statements made during custodial interrogation",
    explanation: "Cases can proceed without statements if there's other evidence. Miranda violations don't automatically dismiss charges."
  },
  {
    myth: "You can't be charged if you didn't know the law",
    reality: "Ignorance of the law is generally not a defense",
    explanation: "With few exceptions, not knowing something is illegal doesn't protect you from prosecution."
  }
];

const helplines = [
  {
    name: "National Domestic Violence Hotline",
    number: "1-800-799-7233",
    description: "24/7 support for domestic violence victims",
    website: "thehotline.org"
  },
  {
    name: "RAINN National Sexual Assault Hotline",
    number: "1-800-656-4673", 
    description: "Confidential support for sexual assault survivors",
    website: "rainn.org"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 crisis support via text message",
    website: "crisistextline.org"
  },
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 mental health crisis support",
    website: "suicidepreventionlifeline.org"
  }
];

const quizQuestions = [
  {
    id: 1,
    question: "During a police stop, you have the right to:",
    options: [
      "Remain silent",
      "Ask if you're free to leave", 
      "Refuse searches without a warrant",
      "All of the above"
    ],
    correct: 3,
    explanation: "You have all these rights during police interactions. Knowing and exercising them appropriately is important."
  },
  {
    id: 2,
    question: "Cyberbullying laws apply to:",
    options: [
      "Only adults",
      "Only school-related incidents",
      "Both minors and adults in various contexts",
      "Only social media platforms"
    ],
    correct: 2,
    explanation: "Cyberbullying laws protect people of all ages and apply across different digital platforms and contexts."
  }
];

export function AwarenessHub() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizStarted(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Legal Awareness Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive resource for understanding legal rights, debunking myths, 
            and building practical knowledge for real-world situations.
          </p>
        </div>

        <Tabs defaultValue="articles" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Law Articles</span>
            </TabsTrigger>
            <TabsTrigger value="rights" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Your Rights</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Story Cards</span>
            </TabsTrigger>
            <TabsTrigger value="myths" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Myth vs Reality</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Law in Simple Words */}
          <TabsContent value="articles" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lawArticles.map((article) => (
                <Card 
                  key={article.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-justice-primary/10 text-justice-primary">
                        {article.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{article.summary}</p>
                    <Button variant="outline" size="sm">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedArticle && (
              <Card className="mt-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">
                      {lawArticles.find(a => a.id === selectedArticle)?.title}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedArticle(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {lawArticles.find(a => a.id === selectedArticle)?.content}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Know Your Rights */}
          <TabsContent value="rights" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rightsGuides.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <Card key={guide.id}>
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-justice-primary/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-justice-primary" />
                        </div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {guide.points.map((point, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-justice-success mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Visual Story Cards */}
          <TabsContent value="stories" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {storyCards.map((story) => (
                <Card 
                  key={story.id}
                  className="cursor-pointer transition-all duration-200 hover:shadow-lg"
                  onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{story.icon}</div>
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Scenario:</h4>
                        <p className="text-gray-700 text-sm">{story.scenario}</p>
                      </div>
                      
                      {selectedStory === story.id && (
                        <>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Outcome:</h4>
                            <p className="text-gray-700 text-sm">{story.outcome}</p>
                          </div>
                          
                          <div className="bg-justice-primary/5 p-4 rounded-lg">
                            <h4 className="font-semibold text-justice-primary mb-1">Legal Lesson:</h4>
                            <p className="text-gray-700 text-sm">{story.lesson}</p>
                          </div>
                        </>
                      )}
                      
                      <Button variant="outline" size="sm" className="w-full">
                        {selectedStory === story.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Myth vs Reality */}
          <TabsContent value="myths" className="space-y-6">
            <div className="space-y-6">
              {mythsReality.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <X className="h-5 w-5 text-red-500" />
                          <h3 className="font-semibold text-red-700">Myth</h3>
                        </div>
                        <p className="text-gray-700 bg-red-50 p-3 rounded-lg">{item.myth}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <h3 className="font-semibold text-green-700">Reality</h3>
                        </div>
                        <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{item.reality}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
                      <p className="text-gray-700 text-sm">{item.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quiz Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-6 w-6 text-justice-primary" />
                  <span>Test Your Knowledge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!quizStarted ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">
                      Take a quick quiz to test your understanding of legal rights and common misconceptions.
                    </p>
                    <Button 
                      onClick={() => setQuizStarted(true)}
                      className="bg-justice-primary hover:bg-justice-primary/90"
                    >
                      Start Quiz
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <span className="text-sm text-gray-600">Score: {score}/{quizQuestions.length}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {quizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-2">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? "default" : "outline"}
                            className="w-full text-left justify-start"
                            onClick={() => handleQuizAnswer(index)}
                            disabled={showExplanation}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                      
                      {showExplanation && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 mb-4">
                            {quizQuestions[currentQuestion].explanation}
                          </p>
                          <Button onClick={nextQuestion}>
                            {currentQuestion < quizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources & Helplines */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Helplines */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Phone className="h-6 w-6 text-justice-primary mr-2" />
                  Emergency Helplines
                </h2>
                <div className="space-y-4">
                  {helplines.map((helpline, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{helpline.name}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <Phone className="h-4 w-4 text-justice-primary" />
                          <span className="font-mono text-lg text-justice-primary">{helpline.number}</span>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{helpline.description}</p>
                        <a 
                          href={`https://${helpline.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-justice-primary hover:underline text-sm"
                        >
                          {helpline.website}
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Legal Aid Organizations */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-6 w-6 text-justice-primary mr-2" />
                  Legal Aid Organizations
                </h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Legal Aid Society</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Free legal services for low-income individuals and families
                      </p>
                      <p className="text-justice-primary text-sm">legalaid.org</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">ACLU (American Civil Liberties Union)</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Protecting constitutional rights and civil liberties
                      </p>
                      <p className="text-justice-primary text-sm">aclu.org</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">National Legal Aid & Defender Association</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Find local legal aid organizations and public defenders
                      </p>
                      <p className="text-justice-primary text-sm">nlada.org</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Juvenile Law Center</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Advocacy and legal resources for youth in the justice system
                      </p>
                      <p className="text-justice-primary text-sm">jlc.org</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Emergency Instructions */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  In Case of Emergency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Immediate Danger</h4>
                    <p className="text-red-700">Call 911 immediately</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Legal Emergency</h4>
                    <p className="text-red-700">Contact a lawyer or legal aid immediately</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-2">Mental Health Crisis</h4>
                    <p className="text-red-700">Call 988 (Suicide Prevention Lifeline)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
