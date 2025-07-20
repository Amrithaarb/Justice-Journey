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
  }
];

const sampleScenario = {
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
    const choice = currentChoice ? sampleScenario.choices.find(c => c.id === currentChoice) : null;

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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{sampleScenario.title}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
              <span>Step {sampleScenario.currentStep} of {sampleScenario.totalSteps}</span>
              <span>•</span>
              <span>Cyberbullying</span>
            </div>
            <Progress value={sampleScenario.progress} className="h-2" />
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
                {sampleScenario.situation}
              </p>
            </CardContent>
          </Card>

          {/* Choices */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What would you do?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sampleScenario.choices.map((choice) => (
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
    const choice = sampleScenario.choices.find(c => c.id === currentChoice);
    
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
