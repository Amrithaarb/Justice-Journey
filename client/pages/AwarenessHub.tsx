import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
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
  MessageCircle,
  ExternalLink,
  Clock,
  Star,
  Brain,
  Send,
  Lightbulb,
  Award,
  TrendingUp
} from "lucide-react";

const lawArticles = [
  {
    id: "cyberbullying",
    title: "Understanding Cyberbullying Laws",
    category: "Digital Rights",
    readTime: "8 min read",
    summary: "Comprehensive guide to cyberbullying laws, digital harassment, and your legal options for protection",
    author: "Legal Expert Team",
    publishDate: "January 2024",
    tags: ["Digital Rights", "Youth Protection", "Harassment"],
    relatedLinks: [
      { title: "Report Cyberbullying - FBI", url: "https://www.fbi.gov/investigate/violent-crime/cac" },
      { title: "Cyberbullying Research Center", url: "https://cyberbullying.org" },
      { title: "State Cyberbullying Laws", url: "https://www.stopbullying.gov/cyberbullying/laws" }
    ],
    content: `
      <h3>What Constitutes Cyberbullying?</h3>
      <p>Cyberbullying is harassment that occurs through electronic communication, including social media, text messages, emails, and online platforms. Most states have specific laws that make cyberbullying a criminal offense, especially when it involves minors.</p>
      
      <h3>Key Legal Elements</h3>
      <ul>
        <li><strong>Repeated harassment:</strong> Multiple instances of unwanted contact</li>
        <li><strong>Intent to harm:</strong> Deliberate actions to cause emotional distress</li>
        <li><strong>Digital platform:</strong> Use of electronic communication devices</li>
        <li><strong>Substantial disruption:</strong> Impact on education, work, or daily life</li>
      </ul>
      
      <h3>Legal Consequences</h3>
      <p>Depending on severity and jurisdiction, cyberbullying can result in:</p>
      <ul>
        <li>Misdemeanor charges with fines up to $1,000</li>
        <li>Felony charges for severe cases or threats</li>
        <li>Civil lawsuits for damages</li>
        <li>School disciplinary action</li>
        <li>Restraining orders</li>
      </ul>
      
      <h3>How to Document Evidence</h3>
      <p>Proper documentation is crucial for legal action:</p>
      <ul>
        <li>Screenshot messages with timestamps</li>
        <li>Save original URLs and metadata</li>
        <li>Keep a written log of incidents</li>
        <li>Preserve any witness statements</li>
        <li>Report to platform administrators</li>
      </ul>
    `
  },
  {
    id: "arrest-rights",
    title: "Your Constitutional Rights During Arrest",
    category: "Constitutional Rights",
    readTime: "12 min read",
    summary: "Essential knowledge about Miranda rights, police procedures, and protecting your constitutional rights",
    author: "Criminal Defense Attorney",
    publishDate: "January 2024",
    tags: ["Miranda Rights", "Constitutional Law", "Police Procedures"],
    relatedLinks: [
      { title: "Know Your Rights - ACLU", url: "https://www.aclu.org/know-your-rights" },
      { title: "Miranda Rights Explained", url: "https://www.law.cornell.edu/wex/miranda_rights" },
      { title: "Police Accountability", url: "https://www.policingequity.org" }
    ],
    content: `
      <h3>The Miranda Warning</h3>
      <p>When arrested, you have the right to remain silent, the right to an attorney, and the right to have an attorney provided if you cannot afford one. Police must inform you of these rights before custodial interrogation.</p>
      
      <h3>What Miranda Rights Include</h3>
      <ul>
        <li><strong>Right to Remain Silent:</strong> You don't have to answer questions</li>
        <li><strong>Anything You Say:</strong> Can be used against you in court</li>
        <li><strong>Right to Attorney:</strong> You can request a lawyer at any time</li>
        <li><strong>Appointed Attorney:</strong> Free legal representation if you can't afford one</li>
      </ul>
      
      <h3>When Miranda Rights Apply</h3>
      <p>Miranda warnings are required when two conditions are met:</p>
      <ul>
        <li><strong>Custody:</strong> You are not free to leave</li>
        <li><strong>Interrogation:</strong> Police are asking questions</li>
      </ul>
      
      <h3>Common Miranda Violations</h3>
      <ul>
        <li>Questioning before reading rights</li>
        <li>Continuing after you invoke rights</li>
        <li>Inadequate or incomplete warnings</li>
        <li>Coercive interrogation tactics</li>
      </ul>
      
      <h3>What to Do If Arrested</h3>
      <ol>
        <li>Stay calm and don't resist</li>
        <li>Clearly state you want a lawyer</li>
        <li>Don't answer questions without attorney present</li>
        <li>Don't sign anything without legal counsel</li>
        <li>Remember details for your attorney</li>
      </ol>
    `
  },
  {
    id: "workplace-rights",
    title: "Employee Rights and Workplace Harassment",
    category: "Employment Law",
    readTime: "10 min read",
    summary: "Comprehensive guide to workplace rights, harassment laws, and legal protections for employees",
    author: "Employment Law Specialist",
    publishDate: "January 2024",
    tags: ["Employment Law", "Harassment", "Discrimination", "Workers Rights"],
    relatedLinks: [
      { title: "EEOC - File a Charge", url: "https://www.eeoc.gov/how-file-charge-employment-discrimination" },
      { title: "Department of Labor", url: "https://www.dol.gov/agencies/whd" },
      { title: "Workplace Fairness", url: "https://www.workplacefairness.org" }
    ],
    content: `
      <h3>Protected Characteristics</h3>
      <p>Employees are protected from discrimination and harassment based on:</p>
      <ul>
        <li>Race, color, or national origin</li>
        <li>Sex, gender identity, or sexual orientation</li>
        <li>Religion or religious beliefs</li>
        <li>Age (40 and older)</li>
        <li>Disability or medical condition</li>
        <li>Pregnancy or family status</li>
      </ul>
      
      <h3>Types of Workplace Harassment</h3>
      <ul>
        <li><strong>Quid Pro Quo:</strong> Job benefits tied to sexual favors</li>
        <li><strong>Hostile Environment:</strong> Persistent unwelcome conduct</li>
        <li><strong>Retaliation:</strong> Punishment for reporting violations</li>
        <li><strong>Discrimination:</strong> Unequal treatment based on protected class</li>
      </ul>
      
      <h3>Legal Requirements for Employers</h3>
      <ul>
        <li>Maintain harassment-free workplace</li>
        <li>Investigate complaints promptly</li>
        <li>Take corrective action when needed</li>
        <li>Prohibit retaliation against complainants</li>
        <li>Provide anti-harassment training</li>
      </ul>
      
      <h3>Steps to Take When Harassed</h3>
      <ol>
        <li><strong>Document Everything:</strong> Dates, times, witnesses, details</li>
        <li><strong>Report Internally:</strong> Follow company complaint procedures</li>
        <li><strong>Keep Records:</strong> Save emails, memos, and responses</li>
        <li><strong>File External Complaint:</strong> EEOC or state agency if needed</li>
        <li><strong>Seek Legal Counsel:</strong> Consult with employment attorney</li>
      </ol>
    `
  }
];

const detailedRightsGuides = [
  {
    id: "police-interaction",
    title: "Comprehensive Guide: Interacting with Police",
    icon: Shield,
    description: "Everything you need to know about your rights during police encounters",
    sections: [
      {
        title: "Traffic Stops",
        points: [
          "Pull over safely and turn off engine",
          "Keep hands visible on steering wheel",
          "You must provide license, registration, and insurance",
          "You have the right to remain silent beyond basic identification",
          "You can refuse searches without a warrant (though police may search if they have probable cause)",
          "Ask 'Am I free to leave?' if the purpose of the stop isn't clear"
        ]
      },
      {
        title: "Street Encounters",
        points: [
          "You can ask if you're being detained or are free to leave",
          "If you're not being detained, you can walk away",
          "You don't have to answer questions about where you're going or what you're doing",
          "Never run from police, even if you believe the stop is unfair",
          "Keep your hands visible at all times",
          "Don't resist arrest, even if you believe it's wrongful"
        ]
      },
      {
        title: "Home Searches",
        points: [
          "Police need a warrant to enter your home in most cases",
          "You have the right to see the warrant and check it covers your address",
          "Exceptions include 'hot pursuit,' emergency aid, and preventing evidence destruction",
          "You can refuse entry if there's no warrant and no emergency",
          "Don't physically resist entry, but clearly state you don't consent",
          "Ask to contact your attorney if police want to search"
        ]
      },
      {
        title: "Arrest Procedures",
        points: [
          "Police must have probable cause to arrest you",
          "You have the right to know what you're being charged with",
          "Miranda rights must be read before custodial interrogation",
          "You can invoke your right to remain silent and request an attorney",
          "Police can search you and your immediate area during arrest",
          "You have the right to one phone call"
        ]
      }
    ]
  },
  {
    id: "filing-fir",
    title: "Complete Guide: Filing an FIR (First Information Report)",
    icon: FileText,
    description: "Step-by-step process for filing police reports and formal complaints",
    sections: [
      {
        title: "When to File an FIR",
        points: [
          "Any cognizable offense (serious crimes like theft, assault, fraud)",
          "Domestic violence incidents",
          "Cybercrime and online harassment",
          "Property crimes and vandalism",
          "Sexual harassment or assault",
          "Financial fraud or identity theft"
        ]
      },
      {
        title: "Filing Process",
        points: [
          "Visit the nearest police station to the crime location",
          "Provide detailed account of the incident",
          "Include dates, times, locations, and witness information",
          "Bring any available evidence (photos, documents, messages)",
          "Police are legally required to register your complaint",
          "Get a copy of the FIR with the registration number"
        ]
      },
      {
        title: "What to Include",
        points: [
          "Exact date, time, and location of incident",
          "Names and descriptions of all parties involved",
          "Detailed sequence of events",
          "Any injuries or damages sustained",
          "List of witnesses with contact information",
          "Description of any evidence collected"
        ]
      },
      {
        title: "Your Rights",
        points: [
          "Police cannot refuse to register an FIR for cognizable offenses",
          "You have the right to get a free copy of the FIR",
          "You can file an FIR in any language you're comfortable with",
          "Police must provide you with the case registration number",
          "You can approach higher authorities if police refuse to file FIR",
          "You have the right to updates on investigation progress"
        ]
      }
    ]
  },
  {
    id: "legal-representation",
    title: "Understanding Your Right to Legal Representation",
    icon: Scale,
    description: "Complete guide to accessing legal help and understanding attorney-client relationships",
    sections: [
      {
        title: "When You Need a Lawyer",
        points: [
          "Criminal charges or investigations",
          "Civil lawsuits or being sued",
          "Family law matters (divorce, custody)",
          "Employment disputes or termination",
          "Immigration proceedings",
          "Contract disputes or business issues"
        ]
      },
      {
        title: "Types of Legal Aid",
        points: [
          "Public defenders for criminal cases (if you can't afford private counsel)",
          "Legal aid societies for civil matters",
          "Pro bono services from private attorneys",
          "Law school clinics with supervised students",
          "Self-help resources and court assistance programs",
          "Limited scope representation for specific issues"
        ]
      },
      {
        title: "Attorney-Client Privilege",
        points: [
          "Communications with your lawyer are confidential",
          "Privilege applies even before you officially hire the attorney",
          "Covers written, oral, and electronic communications",
          "Lawyer cannot reveal information without your consent",
          "Privilege survives even after the representation ends",
          "Few exceptions: future crimes or fraud"
        ]
      },
      {
        title: "Working with Your Attorney",
        points: [
          "Be completely honest about all facts",
          "Provide all relevant documents and evidence",
          "Ask questions if you don't understand something",
          "Keep copies of all legal documents",
          "Respond promptly to attorney requests",
          "Understand fee arrangements and billing practices"
        ]
      }
    ]
  }
];

const expandedQuizQuestions = [
  {
    id: 1,
    question: "During a traffic stop, you have the right to:",
    options: [
      "Remain silent beyond providing identification",
      "Ask if you're free to leave", 
      "Refuse searches without a warrant",
      "All of the above"
    ],
    correct: 3,
    explanation: "You have all these rights during police interactions. Knowing and exercising them appropriately is important for protecting yourself legally.",
    difficulty: "Easy",
    category: "Police Interactions"
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
    explanation: "Cyberbullying laws protect people of all ages and apply across different digital platforms and contexts, including workplace, school, and social environments.",
    difficulty: "Easy",
    category: "Digital Rights"
  },
  {
    id: 3,
    question: "Miranda rights must be read when:",
    options: [
      "You are arrested",
      "You are detained for questioning",
      "You are in custody AND being interrogated",
      "Police enter your home"
    ],
    correct: 2,
    explanation: "Miranda rights are required only when both conditions are met: you are in custody (not free to leave) AND police are conducting interrogation.",
    difficulty: "Medium",
    category: "Constitutional Rights"
  },
  {
    id: 4,
    question: "Which is NOT typically required for filing an FIR?",
    options: [
      "Detailed account of the incident",
      "Identity of the complainant",
      "Payment of filing fee",
      "Date and location of the crime"
    ],
    correct: 2,
    explanation: "Filing an FIR is free of charge. Police cannot demand payment for registering a First Information Report for any cognizable offense.",
    difficulty: "Medium",
    category: "Legal Procedures"
  },
  {
    id: 5,
    question: "Workplace harassment based on protected characteristics:",
    options: [
      "Is only illegal in federal workplaces",
      "Must be physical to be actionable",
      "Can create legal liability for employers",
      "Is protected by free speech rights"
    ],
    correct: 2,
    explanation: "Employers have legal obligations to maintain harassment-free workplaces and can face significant liability for failing to address harassment based on protected characteristics.",
    difficulty: "Medium",
    category: "Employment Law"
  },
  {
    id: 6,
    question: "Attorney-client privilege:",
    options: [
      "Only applies after you pay legal fees",
      "Can be waived by law enforcement requests",
      "Protects communications even before hiring",
      "Doesn't cover electronic communications"
    ],
    correct: 2,
    explanation: "Attorney-client privilege begins as soon as you seek legal advice, even in initial consultations, and covers all forms of communication including electronic.",
    difficulty: "Hard",
    category: "Legal Representation"
  },
  {
    id: 7,
    question: "If police want to search your home without a warrant:",
    options: [
      "You must allow entry if they insist",
      "You can refuse unless there are exigent circumstances",
      "You can demand to see a search warrant",
      "Both B and C are correct"
    ],
    correct: 3,
    explanation: "You have the right to refuse warrantless searches and can ask to see the warrant. However, police may enter without a warrant in emergency situations (exigent circumstances).",
    difficulty: "Hard",
    category: "Constitutional Rights"
  },
  {
    id: 8,
    question: "Documentation of workplace harassment should include:",
    options: [
      "Dates, times, and descriptions of incidents",
      "Names of witnesses present",
      "Copies of relevant emails or messages",
      "All of the above"
    ],
    correct: 3,
    explanation: "Comprehensive documentation including all these elements is crucial for building a strong case and protecting your rights in workplace harassment situations.",
    difficulty: "Easy",
    category: "Employment Law"
  },
  {
    id: 9,
    question: "The most serious form of cyberbullying legally is:",
    options: [
      "Name-calling on social media",
      "Sharing embarrassing photos",
      "Making credible threats of violence",
      "Excluding someone from group chats"
    ],
    correct: 2,
    explanation: "Credible threats of violence constitute criminal behavior and can result in felony charges, restraining orders, and serious legal consequences.",
    difficulty: "Hard",
    category: "Digital Rights"
  },
  {
    id: 10,
    question: "When can you invoke your right to remain silent?",
    options: [
      "Only after being arrested",
      "Only during formal interrogation",
      "At any point during police interaction",
      "Only with an attorney present"
    ],
    correct: 2,
    explanation: "You can invoke your right to remain silent at any time during any police interaction, whether you're arrested, detained, or just questioned voluntarily.",
    difficulty: "Medium",
    category: "Constitutional Rights"
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

export function AwarenessHub() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  // Real-time scenario analyzer
  const [scenarioInput, setScenarioInput] = useState("");
  const [scenarioAnalysis, setScenarioAnalysis] = useState<any>(null);
  const [analyzingScenario, setAnalyzingScenario] = useState(false);

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    
    if (answerIndex === expandedQuizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < expandedQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
  };

  const analyzeScenario = async () => {
    if (!scenarioInput.trim()) return;

    setAnalyzingScenario(true);

    // Simulate AI analysis - in real app this would call an AI service
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Enhanced analysis based on Indian legal framework
    let analysis = {
      riskLevel: "Medium",
      legalConsequences: [],
      recommendations: [],
      relatedLaws: [],
      constitutionalRights: [],
      legalProcedures: [],
      color: "yellow"
    };

    const input = scenarioInput.toLowerCase();

    if (input.includes("threat") || input.includes("violence") || input.includes("hurt") || input.includes("attack")) {
      analysis = {
        riskLevel: "High",
        legalConsequences: [
          "Criminal charges under IPC Section 506 (Criminal Intimidation)",
          "IPC Section 503 (Criminal Intimidation) - Up to 2 years imprisonment",
          "Possible charges under IPC Section 351 (Assault) if physical threat",
          "Cyberbullying charges under IT Act 2000 Section 66A (if online)",
          "Possible restraining order under CrPC Section 107/108",
          "Civil liability for damages under tort law"
        ],
        recommendations: [
          "IMMEDIATELY cease any threatening behavior - it's a criminal offense",
          "Seek mediation through Lok Adalat for dispute resolution",
          "Consult a criminal lawyer if already charged",
          "File counter-complaint if you're being threatened",
          "Preserve evidence of threats (screenshots, recordings)",
          "Report to local police station under CrPC Section 154 (FIR)"
        ],
        relatedLaws: [
          "Indian Penal Code (IPC) Sections 503, 504, 506 - Criminal Intimidation",
          "IPC Section 351 - Assault",
          "IT Act 2000 Section 66A, 67 - Cyberbullying",
          "Criminal Procedure Code (CrPC) Section 107, 108 - Preventive Orders",
          "Protection of Women from Domestic Violence Act 2005 (if applicable)"
        ],
        constitutionalRights: [
          "Article 21 - Right to Life and Personal Liberty (protection from threats)",
          "Article 19(1)(a) - Freedom of Speech doesn't protect threatening speech",
          "Article 14 - Right to Equality before law",
          "Article 22 - Protection against arrest and detention (if arrested)"
        ],
        legalProcedures: [
          "File FIR at nearest police station (mandatory registration)",
          "Collect evidence: messages, witnesses, medical reports",
          "Apply for anticipatory bail under CrPC Section 438 if charges likely",
          "Seek legal aid if unable to afford lawyer (Legal Services Authority)",
          "Court procedure: Magistrate trial under CrPC Chapter XX"
        ],
        color: "red"
      };
    } else if (input.includes("steal") || input.includes("theft") || input.includes("take") || input.includes("rob")) {
      analysis = {
        riskLevel: "High",
        legalConsequences: [
          "IPC Section 378 - Theft: Up to 3 years imprisonment + fine",
          "IPC Section 379 - Punishment for theft",
          "IPC Section 380 - Theft in dwelling house: Up to 7 years",
          "IPC Section 392 - Robbery: Up to 10 years imprisonment",
          "Juvenile Justice Act 2015 if under 18 years",
          "Permanent criminal record affecting employment"
        ],
        recommendations: [
          "DO NOT proceed - theft is a serious criminal offense",
          "Return stolen property immediately to reduce charges",
          "Engage lawyer specializing in criminal law",
          "Apply for bail under CrPC Section 436/437",
          "Consider plea bargaining under CrPC Section 265A",
          "Seek rehabilitation programs if addiction-related"
        ],
        relatedLaws: [
          "Indian Penal Code Sections 378-382 - Theft provisions",
          "IPC Sections 392-402 - Robbery and Dacoity",
          "Juvenile Justice (Care and Protection) Act 2015",
          "Probation of Offenders Act 1958 (first-time offenders)",
          "Code of Criminal Procedure 1973 - Trial procedures"
        ],
        constitutionalRights: [
          "Article 20(3) - Protection against self-incrimination",
          "Article 22(1) - Right to be informed of arrest grounds",
          "Article 22(2) - Right to legal representation",
          "Article 21 - Right to fair trial"
        ],
        legalProcedures: [
          "Police investigation under CrPC Section 156",
          "Arrest procedures under CrPC Section 41",
          "Bail application within 24 hours of arrest",
          "Charge sheet filing within 60/90 days",
          "Trial in Sessions Court (if punishment > 3 years)"
        ],
        color: "red"
      };
    } else if (input.includes("bribe") || input.includes("corruption") || input.includes("payment")) {
      analysis = {
        riskLevel: "High",
        legalConsequences: [
          "Prevention of Corruption Act 1988 - Up to 7 years imprisonment",
          "IPC Section 171B - Bribery (electoral): Up to 1 year",
          "Disqualification from holding public office",
          "Attachment of assets under Benami Transactions Act",
          "Income Tax proceedings for unexplained wealth",
          "Social boycott and reputation damage"
        ],
        recommendations: [
          "Report corruption to Anti-Corruption Bureau immediately",
          "Document evidence with timestamps and witnesses",
          "Use RTI Act 2005 to expose corrupt practices",
          "Contact Central Vigilance Commission (CVC)",
          "File complaint with Lokpal/Lokayukta",
          "Seek protection under Whistleblowers Act 2014"
        ],
        relatedLaws: [
          "Prevention of Corruption Act 1988",
          "Indian Penal Code Sections 161-165 - Public servant corruption",
          "Right to Information Act 2005",
          "Lokpal and Lokayuktas Act 2013",
          "Whistleblowers Protection Act 2014"
        ],
        constitutionalRights: [
          "Article 14 - Equality before law (anti-corruption principle)",
          "Article 19(1)(a) - Right to information and expose corruption",
          "Article 21 - Right to corruption-free governance",
          "DPSP Article 39(b) - Distribution of material resources"
        ],
        legalProcedures: [
          "File complaint with Special Judge (PC Act court)",
          "CBI/ACB investigation procedures",
          "Asset recovery under PMLA 2002",
          "Fast-track trial procedures",
          "Appeal to High Court under CrPC Section 374"
        ],
        color: "red"
      };
    } else if (input.includes("discrimination") || input.includes("caste") || input.includes("religion") || input.includes("untouchability")) {
      analysis = {
        riskLevel: "High",
        legalConsequences: [
          "Protection of Civil Rights Act 1955 - Up to 6 months imprisonment",
          "SC/ST (Prevention of Atrocities) Act 1989 - Up to 5 years",
          "IPC Section 153A - Promoting enmity: Up to 3 years",
          "Constitutional violation liable for compensation",
          "Employment consequences under Equal Opportunity laws",
          "Social sanctions and public condemnation"
        ],
        recommendations: [
          "Report to National/State Human Rights Commission",
          "File complaint under relevant anti-discrimination laws",
          "Approach District Collector for immediate relief",
          "Contact SC/ST Commission if applicable",
          "Seek legal aid from Human Rights organizations",
          "Document incidents with evidence and witnesses"
        ],
        relatedLaws: [
          "Protection of Civil Rights Act 1955",
          "SC/ST (Prevention of Atrocities) Act 1989",
          "Equal Remuneration Act 1976",
          "Rights of Persons with Disabilities Act 2016",
          "Indian Penal Code Section 153A, 295A"
        ],
        constitutionalRights: [
          "Article 15 - Prohibition of discrimination",
          "Article 16 - Equality of opportunity in employment",
          "Article 17 - Abolition of untouchability",
          "Article 25 - Freedom of religion",
          "Article 29 - Cultural and educational rights"
        ],
        legalProcedures: [
          "Complaint to Police under relevant sections",
          "Approach Special Court under SC/ST Act",
          "Human Rights Commission inquiry",
          "Constitutional remedy under Article 32",
          "Civil suit for damages under tort law"
        ],
        color: "red"
      };
    } else if (input.includes("property") || input.includes("land") || input.includes("house") || input.includes("dispute")) {
      analysis = {
        riskLevel: "Medium",
        legalConsequences: [
          "Civil suit for possession/title under CPC",
          "Criminal trespass under IPC Section 441",
          "Registration Act violations if documents forged",
          "Stamp duty and registration fee penalties",
          "Limitation Act 1963 - time-barred claims",
          "Court costs and legal fees"
        ],
        recommendations: [
          "Verify property documents at Sub-Registrar office",
          "Conduct title search for clear ownership",
          "Engage property lawyer for legal opinion",
          "Consider mediation/arbitration for faster resolution",
          "File civil suit within limitation period",
          "Seek interim injunction to prevent alienation"
        ],
        relatedLaws: [
          "Transfer of Property Act 1882",
          "Registration Act 1908",
          "Indian Stamp Act 1899",
          "Real Estate (Regulation and Development) Act 2016",
          "Code of Civil Procedure 1908"
        ],
        constitutionalRights: [
          "Article 300A - Right to property (limited protection)",
          "Article 19(1)(f) - Right to acquire property (historical)",
          "Article 31 - Compensation for property acquisition",
          "Article 32/226 - Constitutional remedy for rights violation"
        ],
        legalProcedures: [
          "Civil suit filing in appropriate court",
          "Property document verification",
          "Survey and settlement procedures",
          "Appeal to High Court under CPC Order 43",
          "Execution of decree under CPC Order 21"
        ],
        color: "yellow"
      };
    } else if (input.includes("marriage") || input.includes("divorce") || input.includes("dowry") || input.includes("domestic")) {
      analysis = {
        riskLevel: "Medium to High",
        legalConsequences: [
          "Dowry Prohibition Act 1961 - Up to 5 years imprisonment",
          "IPC Section 498A - Domestic violence: Up to 3 years",
          "Protection of Women from Domestic Violence Act 2005",
          "Hindu Marriage Act/Special Marriage Act violations",
          "Child marriage under Prohibition of Child Marriage Act",
          "Maintenance obligations under CrPC Section 125"
        ],
        recommendations: [
          "Report domestic violence to police immediately",
          "Approach Protection Officer under PWDVA 2005",
          "File for maintenance under CrPC Section 125",
          "Seek protection order from Magistrate",
          "Contact National Commission for Women",
          "Engage family court lawyer for divorce proceedings"
        ],
        relatedLaws: [
          "Protection of Women from Domestic Violence Act 2005",
          "Dowry Prohibition Act 1961",
          "Hindu Marriage Act 1955",
          "Indian Christian Marriage Act 1872",
          "Muslim Personal Law (Shariat) Application Act 1937"
        ],
        constitutionalRights: [
          "Article 14 - Gender equality",
          "Article 15(3) - Special provision for women",
          "Article 21 - Right to live with dignity",
          "Article 25 - Freedom of religion in marriage",
          "Article 44 - Uniform Civil Code (directive principle)"
        ],
        legalProcedures: [
          "FIR under IPC Section 498A for domestic violence",
          "Family Court proceedings for divorce/maintenance",
          "Magistrate Court for protection orders",
          "Appeal to High Court under family laws",
          "Alternative Dispute Resolution in family matters"
        ],
        color: "yellow"
      };
    } else {
      analysis = {
        riskLevel: "Low to Medium",
        legalConsequences: [
          "Potential civil liability under Indian Contract Act 1872",
          "Possible tort liability for damages",
          "Professional/educational disciplinary action",
          "Reputation and social consequences",
          "Administrative penalties if applicable",
          "Future legal complications"
        ],
        recommendations: [
          "Consult legal expert for specific advice",
          "Review applicable laws and regulations",
          "Consider Alternative Dispute Resolution (ADR)",
          "Document all relevant facts and evidence",
          "Seek mediation through Lok Adalat",
          "Understand long-term implications"
        ],
        relatedLaws: [
          "Indian Contract Act 1872",
          "Indian Evidence Act 1872",
          "Limitation Act 1963",
          "Consumer Protection Act 2019 (if applicable)",
          "Information Technology Act 2000 (if digital)"
        ],
        constitutionalRights: [
          "Article 21 - Right to life and personal liberty",
          "Article 19 - Fundamental freedoms",
          "Article 32 - Right to constitutional remedies",
          "Article 226 - Writ jurisdiction of High Courts"
        ],
        legalProcedures: [
          "Consultation with appropriate legal counsel",
          "Fact-finding and evidence collection",
          "Legal notice before filing suit",
          "Court jurisdiction determination",
          "Limitation period assessment"
        ],
        color: "green"
      };
    }

    setScenarioAnalysis(analysis);
    setAnalyzingScenario(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Legal Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Get instant legal analysis according to Indian Constitution and laws.
            Understand your rights, legal consequences, and proper procedures for any situation.
          </p>
        </div>

        <Tabs defaultValue="analyzer" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="analyzer" className="flex items-center gap-2 bg-justice-primary/10 text-justice-primary font-semibold">
              <Brain className="h-5 w-5" />
              <span className="hidden sm:inline">Legal Analyzer</span>
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2 opacity-70">
              <BookOpen className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Articles</span>
            </TabsTrigger>
            <TabsTrigger value="rights" className="flex items-center gap-2 opacity-70">
              <Shield className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Rights</span>
            </TabsTrigger>
            <TabsTrigger value="stories" className="flex items-center gap-2 opacity-70">
              <Eye className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Cases</span>
            </TabsTrigger>
            <TabsTrigger value="myths" className="flex items-center gap-2 opacity-70">
              <HelpCircle className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Quiz</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2 opacity-70">
              <Phone className="h-3 w-3" />
              <span className="hidden sm:inline text-xs">Help</span>
            </TabsTrigger>
          </TabsList>

          {/* Law Articles - Secondary */}
          <TabsContent value="articles" className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Legal Articles & Guides</h3>
              <p className="text-sm text-gray-600">Supplementary reading materials for deeper understanding</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-3 text-sm">{article.summary}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-4">
                      <span>By {article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.publishDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedArticle(article.id)}
                    >
                      Read Full Article
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
                    <div>
                      <CardTitle className="text-2xl mb-2">
                        {lawArticles.find(a => a.id === selectedArticle)?.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>By {lawArticles.find(a => a.id === selectedArticle)?.author}</span>
                        <span className="mx-2">•</span>
                        <span>{lawArticles.find(a => a.id === selectedArticle)?.publishDate}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{lawArticles.find(a => a.id === selectedArticle)?.readTime}</span>
                      </div>
                    </div>
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
                  <div 
                    className="prose max-w-none text-gray-700 leading-relaxed mb-6"
                    dangerouslySetInnerHTML={{ 
                      __html: lawArticles.find(a => a.id === selectedArticle)?.content || "" 
                    }}
                  />
                  
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Related Resources</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {lawArticles.find(a => a.id === selectedArticle)?.relatedLinks.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4 text-justice-primary mr-3" />
                          <span className="text-sm font-medium text-gray-900">{link.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Enhanced Your Rights */}
          <TabsContent value="rights" className="space-y-6">
            <div className="space-y-8">
              {detailedRightsGuides.map((guide) => {
                const IconComponent = guide.icon;
                return (
                  <Card key={guide.id} className="overflow-hidden">
                    <CardHeader className="bg-justice-primary/5">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-justice-primary/10 rounded-lg">
                          <IconComponent className="h-8 w-8 text-justice-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{guide.title}</CardTitle>
                          <p className="text-gray-600 mt-1">{guide.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {guide.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex}>
                            <h4 className="font-semibold text-lg text-gray-900 mb-3 flex items-center">
                              <div className="w-6 h-6 bg-justice-primary text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {sectionIndex + 1}
                              </div>
                              {section.title}
                            </h4>
                            <div className="grid md:grid-cols-2 gap-3 ml-9">
                              {section.points.map((point, pointIndex) => (
                                <div key={pointIndex} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                  <CheckCircle className="h-5 w-5 text-justice-success mt-0.5 flex-shrink-0" />
                                  <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
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

          {/* Enhanced Myth vs Reality with Quiz */}
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

            {/* Enhanced Quiz Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-6 w-6 text-justice-primary" />
                  <span>Comprehensive Knowledge Quiz</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!quizStarted && !quizCompleted ? (
                  <div className="text-center">
                    <div className="mb-6">
                      <Brain className="h-16 w-16 text-justice-primary mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Test Your Legal Knowledge
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Take our comprehensive 10-question quiz covering constitutional rights, 
                        digital laws, employment rights, and legal procedures.
                      </p>
                      <div className="grid md:grid-cols-4 gap-4 text-center mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">10</div>
                          <div className="text-sm text-gray-600">Questions</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">5</div>
                          <div className="text-sm text-gray-600">Categories</div>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">15</div>
                          <div className="text-sm text-gray-600">Minutes</div>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">70%</div>
                          <div className="text-sm text-gray-600">Pass Score</div>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setQuizStarted(true)}
                      className="bg-justice-primary hover:bg-justice-primary/90"
                      size="lg"
                    >
                      Start Comprehensive Quiz
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                ) : quizCompleted ? (
                  <div className="text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-4">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Quiz Complete!</h3>
                    
                    <div className="bg-gradient-to-r from-justice-primary/10 to-justice-secondary/10 p-6 rounded-lg">
                      <div className="text-4xl font-bold text-justice-primary mb-2">
                        {score}/{expandedQuizQuestions.length}
                      </div>
                      <div className="text-lg text-gray-700 mb-2">
                        {Math.round((score / expandedQuizQuestions.length) * 100)}% Score
                      </div>
                      <div className="text-sm text-gray-600">
                        {score >= 7 ? "Excellent knowledge!" : 
                         score >= 5 ? "Good foundation, keep learning!" : 
                         "Consider reviewing the materials and trying again."}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Performance by Category</h4>
                        <div className="space-y-2 text-sm">
                          {["Constitutional Rights", "Digital Rights", "Employment Law", "Legal Procedures", "Police Interactions"].map((category) => {
                            const categoryQuestions = expandedQuizQuestions.filter(q => q.category === category);
                            const categoryScore = categoryQuestions.filter((q, index) => 
                              answers[expandedQuizQuestions.findIndex(eq => eq.id === q.id)] === q.correct
                            ).length;
                            
                            return (
                              <div key={category} className="flex justify-between">
                                <span className="text-gray-600">{category}:</span>
                                <span className="font-medium">
                                  {categoryScore}/{categoryQuestions.length}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                          {score < 7 && (
                            <>
                              <p>• Review the detailed articles in the Articles tab</p>
                              <p>• Study the comprehensive rights guides</p>
                              <p>• Practice with scenario simulations</p>
                            </>
                          )}
                          {score >= 7 && (
                            <>
                              <p>• Try advanced scenario simulations</p>
                              <p>• Share your knowledge with others</p>
                              <p>• Stay updated with legal changes</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 justify-center">
                      <Button onClick={restartQuiz} variant="outline">
                        Retake Quiz
                      </Button>
                      <Button 
                        onClick={() => setSelectedArticle("arrest-rights")}
                        className="bg-justice-primary hover:bg-justice-primary/90"
                      >
                        Continue Learning
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          Question {currentQuestion + 1} of {expandedQuizQuestions.length}
                        </span>
                        <Badge variant="outline">
                          {expandedQuizQuestions[currentQuestion].difficulty}
                        </Badge>
                        <Badge variant="secondary" className="bg-justice-primary/10 text-justice-primary">
                          {expandedQuizQuestions[currentQuestion].category}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600">Score: {score}/{expandedQuizQuestions.length}</span>
                    </div>
                    
                    <Progress value={((currentQuestion + 1) / expandedQuizQuestions.length) * 100} className="h-2" />
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {expandedQuizQuestions[currentQuestion].question}
                      </h3>
                      
                      <div className="space-y-3">
                        {expandedQuizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant={selectedAnswer === index ? "default" : "outline"}
                            className={`w-full text-left justify-start p-4 h-auto ${
                              showExplanation && index === expandedQuizQuestions[currentQuestion].correct
                                ? "bg-green-100 border-green-500 text-green-800"
                                : showExplanation && selectedAnswer === index && index !== expandedQuizQuestions[currentQuestion].correct
                                ? "bg-red-100 border-red-500 text-red-800"
                                : ""
                            }`}
                            onClick={() => handleQuizAnswer(index)}
                            disabled={showExplanation}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="font-medium text-base">
                                {String.fromCharCode(65 + index)}.
                              </div>
                              <span className="text-sm leading-relaxed">{option}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                      
                      {showExplanation && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-2">
                            <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-blue-900 mb-2">Explanation</h4>
                              <p className="text-blue-800 text-sm mb-4">
                                {expandedQuizQuestions[currentQuestion].explanation}
                              </p>
                              <Button 
                                onClick={nextQuestion}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                {currentQuestion < expandedQuizQuestions.length - 1 ? "Next Question" : "See Results"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-Time Scenario Analyzer */}
          <TabsContent value="analyzer" className="space-y-8">
            <Card className="bg-gradient-to-br from-justice-primary/10 to-justice-secondary/10 border-2 border-justice-primary/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="p-3 bg-justice-primary/10 rounded-xl">
                    <Brain className="h-8 w-8 text-justice-primary" />
                  </div>
                  <span className="bg-gradient-to-r from-justice-primary to-justice-secondary bg-clip-text text-transparent">
                    AI Legal Scenario Analyzer
                  </span>
                </CardTitle>
                <div className="space-y-3">
                  <p className="text-lg text-gray-700 font-medium">
                    Comprehensive legal analysis according to Indian Constitution, applicable acts, and legal procedures.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Constitutional Rights Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>IPC & Legal Procedures</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Step-by-Step Guidance</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 pt-0">
                <div>
                  <Label htmlFor="scenario" className="text-base font-medium text-gray-900">
                    Describe your legal situation or planned action:
                  </Label>
                  <Textarea
                    id="scenario"
                    value={scenarioInput}
                    onChange={(e) => setScenarioInput(e.target.value)}
                    placeholder="Examples:
• 'My employer is discriminating against me based on my caste and refusing promotion'
• 'Someone is demanding dowry from my family for marriage'
• 'I want to file a complaint against police harassment'
• 'My landlord is forcibly evicting me without notice'
�� 'I witnessed corruption in a government office'"
                    className="mt-2 min-h-[140px]"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    <strong>Confidential & Educational:</strong> Describe your situation clearly. Analysis covers Indian constitutional rights, applicable laws, and legal procedures. This is for educational awareness only - not professional legal advice.
                  </p>
                </div>
                
                <Button
                  onClick={analyzeScenario}
                  disabled={!scenarioInput.trim() || analyzingScenario}
                  className="bg-gradient-to-r from-justice-primary to-justice-secondary hover:from-justice-primary/90 hover:to-justice-secondary/90 text-white font-semibold py-3 px-8 text-lg"
                  size="lg"
                >
                  {analyzingScenario ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Analyzing Your Legal Situation...
                    </>
                  ) : (
                    <>
                      <Send className="mr-3 h-5 w-5" />
                      Get Instant Legal Analysis
                    </>
                  )}
                </Button>
                
                {scenarioAnalysis && (
                  <div className="space-y-6">
                    <div className={`p-4 rounded-lg border-l-4 ${
                      scenarioAnalysis.color === "red" ? "bg-red-50 border-red-500" :
                      scenarioAnalysis.color === "yellow" ? "bg-yellow-50 border-yellow-500" :
                      "bg-green-50 border-green-500"
                    }`}>
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <AlertTriangle className={`h-5 w-5 mr-2 ${
                          scenarioAnalysis.color === "red" ? "text-red-600" :
                          scenarioAnalysis.color === "yellow" ? "text-yellow-600" :
                          "text-green-600"
                        }`} />
                        Risk Level: {scenarioAnalysis.riskLevel}
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-red-700">
                            <Scale className="h-5 w-5 mr-2" />
                            Legal Consequences Under Indian Law
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {scenarioAnalysis.legalConsequences.map((consequence: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{consequence}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-green-700">
                            <Lightbulb className="h-5 w-5 mr-2" />
                            Recommended Legal Steps
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {scenarioAnalysis.recommendations.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-orange-700">
                            <Shield className="h-5 w-5 mr-2" />
                            Constitutional Rights & Protections
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {scenarioAnalysis.constitutionalRights.map((right: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <Shield className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{right}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center text-purple-700">
                            <FileText className="h-5 w-5 mr-2" />
                            Legal Procedures to Follow
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {scenarioAnalysis.legalProcedures.map((procedure: string, index: number) => (
                              <li key={index} className="flex items-start space-x-2">
                                <FileText className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{procedure}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center text-blue-700">
                          <BookOpen className="h-5 w-5 mr-2" />
                          Applicable Indian Laws & Acts
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-1 gap-3">
                          {scenarioAnalysis.relatedLaws.map((law: string, index: number) => (
                            <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <span className="text-sm text-blue-800 font-medium">{law}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <AlertTriangle className="h-5 w-5 text-amber-600 mr-2" />
                        Important Legal Disclaimer
                      </h4>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          <strong>Educational Purpose Only:</strong> This analysis is based on general provisions of Indian law and is intended for educational awareness only.
                        </p>
                        <p>
                          <strong>Not Legal Advice:</strong> This does not constitute professional legal advice. Laws vary by state, and specific circumstances matter significantly.
                        </p>
                        <p>
                          <strong>Consult Legal Expert:</strong> For any legal situation, immediately consult with a qualified advocate or legal expert familiar with local laws and recent amendments.
                        </p>
                        <p>
                          <strong>Emergency Situations:</strong> In case of immediate legal emergency, contact local police (100) or legal aid services (1098 for child helpline).
                        </p>
                      </div>
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
                          className="text-justice-primary hover:underline text-sm flex items-center"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
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
                      <a href="https://legalaid.org" className="text-justice-primary text-sm flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        legalaid.org
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">ACLU (American Civil Liberties Union)</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Protecting constitutional rights and civil liberties
                      </p>
                      <a href="https://aclu.org" className="text-justice-primary text-sm flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        aclu.org
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">National Legal Aid & Defender Association</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Find local legal aid organizations and public defenders
                      </p>
                      <a href="https://nlada.org" className="text-justice-primary text-sm flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        nlada.org
                      </a>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Juvenile Law Center</h3>
                      <p className="text-gray-600 text-sm mb-2">
                        Advocacy and legal resources for youth in the justice system
                      </p>
                      <a href="https://jlc.org" className="text-justice-primary text-sm flex items-center">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        jlc.org
                      </a>
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
