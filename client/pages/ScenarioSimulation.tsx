import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Link, useLocation } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowLeft, 
  Users, 
  Shield, 
  Smartphone, 
  ShoppingBag,
  Car,
  Home,
  CheckCircle,
  AlertTriangle
} from "lucide-react";

const scenarios = [
  {
    id: "cyberbullying",
    title: "Cyberbullying Situation",
    description: "Navigate online harassment and understand your legal options",
    icon: Smartphone,
    difficulty: "Easy",
    duration: "10 min",
    category: "Digital Rights"
  },
  {
    id: "theft",
    title: "Shoplifting Incident",
    description: "Understand the consequences and legal process of theft",
    icon: ShoppingBag,
    difficulty: "Medium", 
    duration: "15 min",
    category: "Criminal Law"
  },
  {
    id: "police-interaction",
    title: "Police Stop",
    description: "Learn your rights during police interactions",
    icon: Shield,
    difficulty: "Hard",
    duration: "20 min",
    category: "Civil Rights"
  },
  {
    id: "traffic-violation",
    title: "Traffic Stop",
    description: "Navigate a traffic violation scenario",
    icon: Car,
    difficulty: "Easy",
    duration: "8 min",
    category: "Traffic Law"
  },
  {
    id: "domestic-violence",
    title: "Domestic Violence",
    description: "Understanding protection orders and legal remedies",
    icon: Home,
    difficulty: "Hard",
    duration: "25 min",
    category: "Family Law"
  },
    {
    id: "workplace-rights",
    title: "Workplace Harassment",
    description: "Know your rights as an employee",
    icon: Users,
    difficulty: "Medium",
    duration: "12 min",
    category: "Employment Law"
  },
  {
    id: "underage-drinking",
    title: "Underage Drinking Party",
    description: "Navigate legal consequences of underage alcohol consumption",
    icon: AlertTriangle,
    difficulty: "Easy",
    duration: "10 min",
    category: "Juvenile Law"
  },
  {
    id: "free-speech",
    title: "Campus Free Speech",
    description: "Learn about First Amendment rights and limitations",
    icon: Users,
    difficulty: "Hard",
    duration: "18 min",
    category: "Constitutional Law"
  },
  {
    id: "search-seizure",
    title: "School Locker Search",
    description: "Fourth Amendment rights in educational settings",
    icon: Shield,
    difficulty: "Medium",
    duration: "16 min",
    category: "Civil Rights"
  }
];

const sampleScenarios = {
  "cyberbullying": {
    title: "Cyberbullying Situation",
    description: "You witness a classmate being harassed online",
    currentStep: 1,
    totalSteps: 5,
    progress: 20,
    situation: "Your friend Sarah shows you mean messages and fake photos of her posted on social media by other students. She's really upset and doesn't know what to do.",
    choices: [
      {
        id: "report",
        text: "Advise Sarah to report it to school authorities and help her document the evidence",
        consequence: "Good choice! Documentation is crucial for cyberbullying cases."
      },
      {
        id: "confront",
        text: "Confront the bullies directly on social media",
        consequence: "This could escalate the situation and create more problems."
      },
      {
        id: "ignore",
        text: "Tell Sarah to ignore it and it will go away",
        consequence: "Ignoring cyberbullying rarely makes it stop and can worsen."
      },
      {
        id: "support",
        text: "Support Sarah emotionally but take no action",
        consequence: "Emotional support is important but action is also needed."
      }
    ]
  },
  "police-interaction": {
    title: "Police Traffic Stop",
    description: "You are pulled over by police during a routine traffic stop",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "You're driving home from work when you see police lights behind you. The officer approaches your vehicle and asks for your license and registration.",
    choices: [
      {
        id: "comply",
        text: "Calmly provide your license and registration as requested",
        consequence: "Correct! Compliance during traffic stops is important for everyone's safety."
      },
      {
        id: "question",
        text: "Ask why you were pulled over before providing documents",
        consequence: "While you have rights, it's better to comply first, then ask questions."
      },
      {
        id: "refuse",
        text: "Refuse to provide documents and demand to know the reason",
        consequence: "This is not recommended and could escalate the situation unnecessarily."
      },
      {
        id: "record",
        text: "Start recording the interaction on your phone immediately",
        consequence: "You have the right to record, but inform the officer respectfully."
      }
    ]
  },
    "underage-drinking": {
    title: "Underage Drinking Party",
    description: "You're at a party where underage drinking is occurring",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "You're 17 and at a house party where alcohol is being served. The police arrive to investigate a noise complaint. What do you do?",
    choices: [
      {
        id: "leave-quietly",
        text: "Try to leave quietly through the back door",
        consequence: "Leaving calmly is smart, but running might look suspicious."
      },
      {
        id: "stay-honest",
        text: "Stay put and be honest if questioned by police",
        consequence: "Honesty is important, but you still have rights during questioning."
      },
      {
        id: "hide",
        text: "Hide in the bathroom until police leave",
        consequence: "Hiding could make the situation worse if you're discovered."
      },
      {
        id: "call-parents",
        text: "Immediately call your parents for advice",
        consequence: "Good thinking! Having adult support is always wise in legal situations."
      }
    ]
  },
  "theft": {
    title: "Shoplifting Incident",
    description: "You witness a shoplifting incident at a store",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "You're shopping when you see a classmate slip a candy bar into their pocket without paying. Store security hasn't noticed yet. What do you do?",
    choices: [
      {
        id: "report-security",
        text: "Immediately report it to store security",
        consequence: "This stops the crime but could seriously affect your classmate's future."
      },
      {
        id: "confront-friend",
        text: "Approach your classmate and ask them to put it back",
        consequence: "Good approach! Giving them a chance to correct the mistake is wise."
      },
      {
        id: "ignore-situation",
        text: "Pretend you didn't see anything and walk away",
        consequence: "Avoiding involvement might seem easier but doesn't address the issue."
      },
      {
        id: "wait-and-see",
        text: "Wait to see if they pay for it at the register",
        consequence: "Sometimes people put items in pockets temporarily while shopping."
      }
    ]
  },
  "traffic-violation": {
    title: "Traffic Stop",
    description: "You're pulled over for speeding",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "You're running late to work and going 15 mph over the speed limit when you see police lights behind you. The officer approaches your window.",
    choices: [
      {
        id: "be-respectful",
        text: "Be polite, admit you were speeding, and apologize",
        consequence: "Honesty and respect often lead to better outcomes with law enforcement."
      },
      {
        id: "deny-speeding",
        text: "Deny that you were speeding and argue about the speed limit",
        consequence: "Arguing with police rarely helps and could make the situation worse."
      },
      {
        id: "stay-silent",
        text: "Exercise your right to remain silent and say nothing",
        consequence: "You have this right, but in traffic stops, some cooperation is expected."
      },
      {
        id: "ask-radar",
        text: "Ask to see the radar reading and question the officer's methods",
        consequence: "You can ask questions, but challenging the officer's procedures isn't recommended during the stop."
      }
    ]
  },
  "domestic-violence": {
    title: "Domestic Violence",
    description: "A friend confides in you about domestic abuse",
    currentStep: 1,
    totalSteps: 5,
    progress: 20,
    situation: "Your close friend shows you bruises and tearfully admits their partner has been hitting them. They're scared and don't know what to do. They beg you not to tell anyone.",
    choices: [
      {
        id: "respect-wishes",
        text: "Respect their wishes but provide resources and support",
        consequence: "Supporting while respecting autonomy is important, but safety comes first."
      },
      {
        id: "call-police",
        text: "Convince them to call police and offer to go with them",
        consequence: "Police involvement can provide immediate protection and legal options."
      },
      {
        id: "seek-help-secretly",
        text: "Contact domestic violence hotline for advice without telling your friend",
        consequence: "Getting expert advice while maintaining trust can be a good strategy."
      },
      {
        id: "confront-abuser",
        text: "Confront the abusive partner directly",
        consequence: "This could escalate the danger for your friend and yourself."
      }
    ]
  },
  "workplace-rights": {
    title: "Workplace Harassment",
    description: "You experience inappropriate behavior at your part-time job",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "Your supervisor at your part-time job has been making inappropriate comments about your appearance and asking personal questions that make you uncomfortable.",
    choices: [
      {
        id: "document-incidents",
        text: "Start documenting all incidents with dates and details",
        consequence: "Excellent! Documentation is crucial for any workplace harassment case."
      },
      {
        id: "tell-supervisor-stop",
        text: "Tell your supervisor directly that their behavior is inappropriate",
        consequence: "Direct communication can be effective but may not always be safe."
      },
      {
        id: "report-to-hr",
        text: "Report the behavior to HR or the store manager",
        consequence: "Good choice! Companies are legally required to address harassment complaints."
      },
      {
        id: "quit-job",
        text: "Just quit the job to avoid the situation",
        consequence: "This might solve the immediate problem but doesn't address the harassment or protect others."
      }
    ]
  },
  "free-speech": {
    title: "Campus Free Speech",
    description: "Your controversial student organization faces restrictions",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "You're president of a student political organization. The school administration wants to ban your upcoming speaker, claiming their views are 'too controversial' and might upset other students.",
    choices: [
      {
        id: "fight-legally",
        text: "Research First Amendment rights and challenge the restriction legally",
        consequence: "Good approach! Public schools must respect constitutional free speech rights."
      },
      {
        id: "find-compromise",
        text: "Try to negotiate a compromise with the administration",
        consequence: "Compromise can work, but be careful not to give up fundamental rights."
      },
      {
        id: "cancel-speaker",
        text: "Cancel the speaker to avoid conflict with the school",
        consequence: "This avoids immediate conflict but may set a precedent of censorship."
      },
      {
        id: "hold-off-campus",
        text: "Move the event off-campus to avoid school restrictions",
        consequence: "Creative solution! Off-campus events have different legal protections."
      }
    ]
  },
  "search-seizure": {
    title: "School Locker Search",
    description: "School officials want to search your locker",
    currentStep: 1,
    totalSteps: 4,
    progress: 25,
    situation: "The principal calls you to the office and says they received a tip that you have something illegal in your locker. They want to search it immediately.",
    choices: [
      {
        id: "allow-search",
        text: "Allow the search since you have nothing to hide",
        consequence: "Cooperation often looks good, but you should know your rights first."
      },
      {
        id: "ask-for-warrant",
        text: "Ask if they have a warrant or probable cause for the search",
        consequence: "Schools have different search standards than police, but it's good to ask."
      },
      {
        id: "call-parents",
        text: "Request that your parents be present during any search",
        consequence: "Great idea! Having adult support during school discipline is wise."
      },
      {
        id: "know-your-rights",
        text: "Ask to speak with a counselor about your rights before deciding",
        consequence: "Smart! Understanding your rights before making decisions is always better."
      }
    ]
  }
};

export function ScenarioSimulation() {
  const location = useLocation();
  const quickStart = location.state?.quickStart;

  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentChoice, setCurrentChoice] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

      if (selectedScenario && selectedRole && !showResult) {
    console.log("Selected scenario:", selectedScenario);
    const currentScenario = sampleScenarios[selectedScenario as keyof typeof sampleScenarios] || sampleScenarios.cyberbullying;
    console.log("Current scenario data:", currentScenario);
    const choice = currentChoice ? currentScenario.choices.find(c => c.id === currentChoice) : null;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedScenario(null)}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Scenarios
              </Button>
              <Badge variant="secondary" className="bg-justice-primary/10 text-justice-primary">
                {selectedRole}
              </Badge>
            </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{currentScenario.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>Step {currentScenario.currentStep} of {currentScenario.totalSteps}</span>
              <span>•</span>
              <span>{scenarios.find(s => s.id === selectedScenario)?.category}</span>
            </div>
            <Progress value={currentScenario.progress} className="h-2" />
          </div>

          {/* Scenario Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Smartphone className="h-5 w-5 text-justice-primary" />
                <span>Current Situation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                            <p className="text-gray-700 text-lg leading-relaxed">
                {currentScenario.situation}
              </p>
            </CardContent>
          </Card>

          {/* Choices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What would you do?</CardTitle>
            </CardHeader>
                        <CardContent className="space-y-4">
              {currentScenario.choices.map((choice) => (
                <div key={choice.id}>
                  <Button
                    variant={currentChoice === choice.id ? "default" : "outline"}
                    className={`w-full text-left p-6 h-auto justify-start ${
                      currentChoice === choice.id 
                        ? "bg-justice-primary text-white" 
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setCurrentChoice(choice.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                        currentChoice === choice.id 
                          ? "border-white bg-white" 
                          : "border-gray-300"
                      }`}>
                        {currentChoice === choice.id && (
                          <div className="w-3 h-3 bg-justice-primary rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm leading-relaxed">{choice.text}</span>
                    </div>
                  </Button>
                  
                  {currentChoice === choice.id && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        {choice.id === "report" ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm text-gray-700 mb-3">{choice.consequence}</p>
                          <Button 
                            size="sm"
                            onClick={() => setShowResult(true)}
                            className="bg-justice-primary hover:bg-justice-primary/90"
                          >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

    if (showResult) {
    const currentScenario = sampleScenarios[selectedScenario as keyof typeof sampleScenarios] || sampleScenarios.cyberbullying;
    const choice = currentScenario.choices.find(c => c.id === currentChoice);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-full mb-4 mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Scenario Complete!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Your Choice:</h3>
                <p className="text-gray-700 mb-4">{choice?.text}</p>
                <h3 className="font-semibold text-gray-900 mb-2">Legal Insight:</h3>
                <p className="text-gray-700">
                  {choice?.id === "report" 
                    ? "Under most state laws, cyberbullying can be prosecuted as harassment or stalking. Schools are also required to investigate and take action. Documenting evidence is crucial for any legal proceedings."
                    : "While your approach shows care, the most effective response involves proper documentation and reporting through official channels to ensure the harassment stops and doesn't happen to others."
                  }
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => {
                    setSelectedScenario(null);
                    setSelectedRole(null);
                    setCurrentChoice(null);
                    setShowResult(false);
                  }}
                  variant="outline"
                >
                  Try Another Scenario
                </Button>
                <Link to="/results">
                  <Button className="bg-justice-primary hover:bg-justice-primary/90">
                    View Full Results
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedScenario(null)}
              className="text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Scenarios
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
            <p className="text-lg text-gray-600">
              Select the perspective you'd like to experience in this cyberbullying scenario.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {["Witness/Friend", "Victim", "Authority Figure"].map((role) => (
              <Card 
                key={role}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedRole === role ? "ring-2 ring-justice-primary" : ""
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-justice-primary/10 rounded-full mb-4">
                    <Users className="h-6 w-6 text-justice-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{role}</h3>
                  <p className="text-sm text-gray-600">
                    {role === "Witness/Friend" && "Help a friend who's being cyberbullied"}
                    {role === "Victim" && "Experience being cyberbullied and learn your options"}
                    {role === "Authority Figure" && "Handle a cyberbullying report as a teacher or parent"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedRole && (
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="bg-justice-primary hover:bg-justice-primary/90"
              >
                Start Scenario as {selectedRole}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Start Banner */}
        {quickStart === 'student' && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-justice-primary to-justice-secondary text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Welcome to Quick Start - Student Path!</h2>
                    <p className="text-white/90">You're starting with scenarios designed specifically for students. Ready to learn about your legal rights?</p>
                  </div>
                  <Link to="/profile">
                    <Button variant="secondary" className="bg-white text-justice-primary hover:bg-gray-100">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Interactive Legal Scenarios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Step into real-world legal situations and learn through interactive decision-making. 
            Each scenario helps you understand the law and your rights in practical situations.
          </p>
        </div>

                {/* How Scenarios Work Section */}
        <div className="mb-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How Scenarios Work
              </h2>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-justice-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">1</div>
                  <p className="text-gray-700">Choose a scenario that interests you</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-justice-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">2</div>
                  <p className="text-gray-700">Select your role (victim, witness, or authority)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-justice-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">3</div>
                  <p className="text-gray-700">Make decisions at key points in the story</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-justice-primary rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">4</div>
                  <p className="text-gray-700">Learn about legal consequences and your rights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            return (
              <Card 
                key={scenario.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-justice-primary to-justice-secondary rounded-lg">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge className={getDifficultyColor(scenario.difficulty)}>
                      {scenario.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{scenario.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{scenario.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{scenario.duration}</span>
                    <span>{scenario.category}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        
      </div>
    </div>
  );
}
